package com.htm.react_springboot_2.auth.controller;

import com.htm.react_springboot_2.auth.dto.SignupRequest;
import com.htm.react_springboot_2.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/api/auth/signup")
    public ResponseEntity<Void> signup(@RequestBody SignupRequest dto) {   // 클라이언트에서 온 JSON을 DTO로 변환
        authService.signup(dto);
        return ResponseEntity.status(201).build();
    }

// @RequestBody: HTTP요청의 body(JSON 등)를 자바 객체로 변환해달라는 뜻


}
