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
    }
}
