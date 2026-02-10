package com.htm.react_springboot_2.auth.service;

import com.htm.react_springboot_2.auth.dto.SignupRequest;
import com.htm.react_springboot_2.global.exception.DuplicateEmailException;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(SignupRequest dto) {
        if(userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateEmailException();
        }

        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        User user = new User(dto.getEmail() , hashedPassword, dto.getName());
        userRepository.save(user);
    }
}
