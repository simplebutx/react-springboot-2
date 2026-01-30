package com.htm.react_springboot_2.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class SignupRequest {

    // 회원가입용 DTO
    @Email(message = "이메일 형식이 올바르지 않습니다.")   // 이메일 형식 자동검증
    @NotBlank(message = "이메일은 필수입니다.")
    public String email;


    @NotBlank(message = "비밀번호는 필수입니다.")
    public String password;


    @NotBlank(message = "이름은 필수입니다.")
    public String name;
}
