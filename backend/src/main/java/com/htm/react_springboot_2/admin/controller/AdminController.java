package com.htm.react_springboot_2.admin.controller;


import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("api/admin/users")
    public ResponseEntity<List<AdminUserListResponse>> getUserList() {
        List<AdminUserListResponse> users = adminService.getUserList();
        return ResponseEntity.ok(users);            // dto -> json
    }
}
