package com.htm.react_springboot_2.user.controller;

import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.post.dto.PostListResponse;
import com.htm.react_springboot_2.user.dto.UserMyPageResponse;
import com.htm.react_springboot_2.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/auth/me")
    public UserMyPageResponse myPage(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return new UserMyPageResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getDisplayName(), userDetails.getRole());
    }

    @DeleteMapping("/api/users/me")
    public ResponseEntity<Void> withdraw(@AuthenticationPrincipal CustomUserDetails userDetails) {
        userService.withdraw(userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/users/me/posts")
    public List<PostListResponse> getMyPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return userService.getMyPosts(userDetails.getId());
    }
}

