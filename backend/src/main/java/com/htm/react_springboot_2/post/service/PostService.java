package com.htm.react_springboot_2.post.service;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.post.dto.*;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<PostListResponse> getPosts(int page, int size) {

        // page번째 페이지를 size개 만큼 최신순으로
        PageRequest pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<PostListResponse> mapped = postRepository.findAll(pageable)  // db에서 가져올때 필요한 페이지만 가져옴
                .map(post -> new PostListResponse(     // Page<Post> -> Page<PostListResponse> 변환
                        post.getId(),
                        post.getTitle(),
                        post.getAuthor().getName(),
                        post.getCreatedAt()
                ));

        return PageResponse.of(mapped);   // Page<PostListResponse> -> PageResponse<PostListResponse> 변환
    }

    @Transactional
    public void createPost(PostCreateRequest dto, String email) {
        User author = userRepository.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException("유저 없음"));
        Post post = new Post(dto.getTitle(), dto.getContent(), dto.getImageKey(), author);
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPostDetail(Long postId, Long loginUserId, Role role) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()->new IllegalArgumentException("게시글 없음"));

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);
        boolean isAdmin = role == Role.ADMIN;

        return new PostDetailResponse(post.getTitle(), post.getContent(), post.getImageKey(),
                post.getAuthor().getName(), post.getAuthor().getId(), post.getCreatedAt(),
                isAuthor, isAuthor || isAdmin);
    }

    @Transactional
    public void updatePost(PostUpdateRequest dto, Long postId, Long loginUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("게시글 없음"));

        if(!post.getAuthor().getId().equals(loginUserId)) {
            throw new IllegalArgumentException("작성자만 수정할 수 있습니다");
        }

        post.updatePost(dto.getTitle(), dto.getContent(), dto.getImageKey());
    }

    @Transactional
    public void deletePost(Long postId, Long loginUserId, boolean isAdmin) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("게시글 없음"));

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);

        if (!isAuthor && !isAdmin) {
            throw new AccessDeniedException("작성자 또는 관리자만 삭제할 수 있습니다");
        }
        postRepository.delete(post);
    }
}
