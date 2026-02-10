package com.htm.react_springboot_2.admin.controller;


import com.htm.react_springboot_2.admin.dto.AdminChangeUserRoleRequest;
import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.admin.service.AdminService;
import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.global.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/api/admin/users")
    public PageResponse<AdminUserListResponse> getUserList(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(required = false) String keyword){
        System.out.println(adminService.getUserList(page, size, keyword));
        return adminService.getUserList(page, size, keyword);            // dto -> json
    }

    @DeleteMapping("/api/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        adminService.deleteUser(id, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/users/{id}")
    public ResponseEntity<Void> changeUserRole(@RequestBody AdminChangeUserRoleRequest dto, @PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        adminService.changeUserRole(dto, id, userDetails.getId());
        return ResponseEntity.noContent().build();
    }
}
