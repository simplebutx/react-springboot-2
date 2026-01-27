package com.htm.react_springboot_2.user.dto;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserMyPageResponse {

    private String email;
    private String name;
    private Role role;
}

