package com.htm.react_springboot_2.admin.controller;


import com.htm.react_springboot_2.admin.dto.AdminChangeUserRoleRequest;
import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/api/admin/users")
    public ResponseEntity<List<AdminUserListResponse>> getUserList() {
        List<AdminUserListResponse> users = adminService.getUserList();
        return ResponseEntity.ok(users);            // dto -> json
    }

    @DeleteMapping("/api/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/users/{id}")
    public ResponseEntity<Void> changeUserRole(@RequestBody AdminChangeUserRoleRequest dto, @PathVariable Long id) {
        adminService.changeUserRole(dto, id);
        return ResponseEntity.noContent().build();
    }
}
