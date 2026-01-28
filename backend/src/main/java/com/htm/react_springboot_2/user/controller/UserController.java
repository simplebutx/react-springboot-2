package com.htm.react_springboot_2.user.controller;

import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.user.dto.UserMyPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/api/auth/me")
    public UserMyPageResponse mypage(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return new UserMyPageResponse(userDetails.getUsername(), userDetails.getName(), userDetails.getRole());
        // CustomUserDetails -> DTO 변환
    }

// 세션은 로그인 성공시에 만들어져 세션 저장소에 저장됨
// @AuthenticationPrincipal: 세션에 저장되어있는 인증 정보로부터 복원된 사용자 정보를 주입
// @AuthenticationPrincipal CustomUserDetails는 서버가 복원해낸 인증 결과물

// 이 API에서는 DB 조회 없이 SecurityContext에 저장된 인증 정보를 사용

// 로그인 이후 요청에서는 DB를 다시 조회하지 않고, 로그인 시 세션에 저정된 Authentication(SecurityContext)에서
// CustomUserDetails를 꺼내 Controller로 전달함


}

