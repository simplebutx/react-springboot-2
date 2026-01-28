package com.htm.react_springboot_2.admin.service;

import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.user.repository.UserRepository;
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
}
