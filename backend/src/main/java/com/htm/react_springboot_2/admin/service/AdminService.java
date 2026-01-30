package com.htm.react_springboot_2.admin.service;

import com.htm.react_springboot_2.admin.dto.AdminChangeUserRoleRequest;
import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public List<AdminUserListResponse> getUserList() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserListResponse(user.getId(), user.getEmail(), user.getName(), user.getRole()))   // entity -> dto
                .toList();
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new IllegalArgumentException("유저 없음"));
        userRepository.delete(user);
    }

    @Transactional
    public void changeUserRole(AdminChangeUserRoleRequest dto, Long id) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new IllegalArgumentException("유저없음"));
        user.updateRole(dto.getRole());
    }
}
