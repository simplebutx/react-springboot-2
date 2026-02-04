package com.htm.react_springboot_2.admin.service;

import com.htm.react_springboot_2.admin.dto.AdminChangeUserRoleRequest;
import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<AdminUserListResponse> getUserList() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserListResponse(user.getId(), user.getEmail(), user.getName(), user.getRole()))   // entity -> dto
                .toList();
    }

    @Transactional
    public void deleteUser(Long id, Long loginUserId) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new IllegalArgumentException("유저 없음"));
        if(id.equals(loginUserId)) {
            throw new IllegalArgumentException("자기 자신은 삭제할 수 없습니다");
        }
        userRepository.delete(user);
    }

    @Transactional
    public void changeUserRole(AdminChangeUserRoleRequest dto, Long id, Long loginUserId) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new IllegalArgumentException("유저 없음"));
        if(id.equals(loginUserId)) {
            throw new IllegalArgumentException("자기 자신은 수정할 수 없습니다");
        }
        user.updateRole(dto.getRole());
    }
}
