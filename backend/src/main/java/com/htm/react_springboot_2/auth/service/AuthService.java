package com.htm.react_springboot_2.auth.service;

import com.htm.react_springboot_2.auth.dto.SignupRequest;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(SignupRequest dto) {
        String hashedPassword = passwordEncoder.encode(dto.getPassword());
        User user = new User(dto.getEmail() , hashedPassword, dto.getName());    // 회원가입 DTO -> Entity로 변환
        userRepository.save(user);   // repository 호출
    }
}
