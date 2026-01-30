package com.htm.react_springboot_2.admin.dto;

import com.htm.react_springboot_2.auth.domain.Role;
import lombok.Getter;

@Getter
public class AdminChangeUserRoleRequest {
    Role role;
}
