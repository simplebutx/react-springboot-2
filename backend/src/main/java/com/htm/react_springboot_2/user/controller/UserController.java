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
        return new UserMyPageResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getName(), userDetails.getRole());
        // CustomUserDetails -> DTO 변환
    }

// 세션은 로그인 성공시에 만들어져 세션 저장소에 저장됨
// @AuthenticationPrincipal CustomUserDetails는 서버가 복원해낸 인증 결과물

// 이 API에서는 DB 조회 없이 SecurityContext에 저장된 인증 정보를 사용

// 로그인 이후 요청에서는 DB를 다시 조회하지 않고, 로그인 시 세션에 저정된 Authentication(SecurityContext)에서
// CustomUserDetails를 꺼내 Controller로 전달함


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

