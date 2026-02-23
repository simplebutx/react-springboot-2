package com.htm.react_springboot_2.post.service;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.global.dto.PageResponse;
import com.htm.react_springboot_2.global.exception.NoPermissionException;
import com.htm.react_springboot_2.global.exception.PostNotFoundException;
import com.htm.react_springboot_2.global.exception.UserNotFoundException;
import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.post.dto.*;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    @Transactional(readOnly = true)
    public PageResponse<PostListResponse> getPosts(int page, int size, String keyword) {


        Pageable pageable = PageRequest.of(page, size,    // pageable 객체 생성
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        String q = hasKeyword ? keyword.trim() : null;


        Page<Post> result = hasKeyword
                ? postRepository.searchByTitleOrContent(q, pageable)
                : postRepository.findAll(pageable);

        Page<PostListResponse> mapped = result
                .map(post -> new PostListResponse(
                        post.getId(), post.getTitle(),
                        post.getAuthor().getName(),
                        post.getCreatedAt()
                ));

        return PageResponse.of(mapped);
    }

    @Transactional
    public void createPost(PostCreateRequest dto, String email) {
        User author = userRepository.findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException());
        Post post = new Post(dto.getTitle(), dto.getContent(), dto.getImageKey(), author);
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPostDetail(Long postId, Long loginUserId, Role role) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);
        boolean isAdmin = role == Role.ADMIN;

        return new PostDetailResponse(post.getTitle(), post.getContent(), post.getImageKey(),
                post.getAuthor().getName(), post.getAuthor().getId(), post.getCreatedAt(), post.getUpdatedAt(),
                isAuthor, isAuthor || isAdmin);
    }

    @Transactional
    public void updatePost(PostUpdateRequest dto, Long postId, Long loginUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        if(!post.getAuthor().getId().equals(loginUserId)) {
            throw new NoPermissionException("작성자만 수정할 수 있습니다");
        }

        post.updatePost(dto.getTitle(), dto.getContent(), dto.getImageKey());
    }

    @Transactional
    public void deletePost(Long postId, Long loginUserId, boolean isAdmin) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);

        if (!isAuthor && !isAdmin) {
            throw new NoPermissionException("작성자 또는 관리자만 삭제할 수 있습니다");
        }
        postRepository.delete(post);
    }
}
