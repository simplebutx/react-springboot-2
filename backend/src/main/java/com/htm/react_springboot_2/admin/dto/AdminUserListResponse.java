package com.htm.react_springboot_2.admin.dto;

import com.htm.react_springboot_2.auth.domain.Role;
import lombok.Getter;

@Getter
public class AdminUserListResponse {

    private Long id;
    private String email;
    private String name;
    private Role role;

    public AdminUserListResponse(Long id, String email, String name, Role role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }
}
