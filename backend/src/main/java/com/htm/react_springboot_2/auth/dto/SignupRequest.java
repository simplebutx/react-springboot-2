package com.htm.react_springboot_2.auth.dto;

import lombok.Getter;

@Getter
public class SignupRequest {

    // 회원가입용 DTO
    public String email;
    public String password;
    public String name;
}
