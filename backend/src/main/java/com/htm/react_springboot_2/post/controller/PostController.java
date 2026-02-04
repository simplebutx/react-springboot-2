package com.htm.react_springboot_2.post.controller;

import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.post.dto.PostCreateRequest;
import com.htm.react_springboot_2.post.dto.PostDetailResponse;
import com.htm.react_springboot_2.post.dto.PostListResponse;
import com.htm.react_springboot_2.post.dto.PostUpdateRequest;
import com.htm.react_springboot_2.post.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/api/posts")
    public List<PostListResponse> getPostList() {
        return postService.getPosts();
    }

    @PostMapping("/api/posts")
    public ResponseEntity<Void> createPost(@Valid @RequestBody PostCreateRequest dto,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        postService.createPost(dto, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/post/{id}")
    public PostDetailResponse getPostDetail(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return postService.getPostDetail(id, userDetails.getId(), userDetails.getRole());
    }


    @PutMapping("/api/post/{id}")
    public ResponseEntity<Void> updatePost(@Valid @RequestBody PostUpdateRequest dto,
                                           @PathVariable Long id,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        postService.updatePost(dto, id, userDetails.getId());
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("api/post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        boolean isAdmin = userDetails.getRole() == Role.ADMIN;
        postService.deletePost(id, userDetails.getId(), isAdmin);
        return ResponseEntity.noContent().build();
    }
}

// ResponseEntity 클래스 = “HTTP 응답 전체를 담는 그릇” 클래스
// HTTP 응답에는 : 상태코드 (200,401), 헤더, 바디(JSON 데이터)가 있다 -> ResponseEntity는 이걸 전부 담음