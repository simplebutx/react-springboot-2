package com.htm.react_springboot_2.post.service;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.post.dto.PostCreateRequest;
import com.htm.react_springboot_2.post.dto.PostDetailResponse;
import com.htm.react_springboot_2.post.dto.PostListResponse;
import com.htm.react_springboot_2.post.dto.PostUpdateRequest;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    public List<PostListResponse> getPosts() {
        return postRepository.findAll()
                .stream()
                .map(post -> new PostListResponse
                        (post.getId(), post.getTitle(), post.getAuthor().getName(), post.getCreatedAt()))
                .toList();
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
