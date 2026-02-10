package com.htm.react_springboot_2.admin.service;

import com.htm.react_springboot_2.admin.dto.AdminChangeUserRoleRequest;
import com.htm.react_springboot_2.admin.dto.AdminUserListResponse;
import com.htm.react_springboot_2.global.dto.PageResponse;
import com.htm.react_springboot_2.global.exception.NoPermissionException;
import com.htm.react_springboot_2.global.exception.UserNotFoundException;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<AdminUserListResponse> getUserList(int page, int size, String keyword) {

        PageRequest pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.ASC, "role"));

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        String q = hasKeyword ? keyword.trim() : null;

        Page<User> result = hasKeyword
                ? userRepository.searchByEmailorName(q, pageable)
                : userRepository.findAll(pageable);

        Page<AdminUserListResponse> mapped = result
                .map(user -> new AdminUserListResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        user.getRole()
                ));

        return PageResponse.of(mapped);
    }

    @Transactional
    public void deleteUser(Long id, Long loginUserId) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new UserNotFoundException());
        if(id.equals(loginUserId)) {
            throw new NoPermissionException("자기 자신은 삭제할 수 없습니다");
        }
        userRepository.delete(user);
    }

    @Transactional
    public void changeUserRole(AdminChangeUserRoleRequest dto, Long id, Long loginUserId) {
        User user = userRepository.findById(id).
                orElseThrow(()-> new UserNotFoundException());
        if(id.equals(loginUserId)) {
            throw new NoPermissionException("자기 자신의 권한은 변경할 수 없습니다");
        }
        user.updateRole(dto.getRole());
    }
}
