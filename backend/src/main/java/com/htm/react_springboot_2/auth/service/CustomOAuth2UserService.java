package com.htm.react_springboot_2.auth.service;

import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request)
            throws OAuth2AuthenticationException {

        OAuth2User oauthUser = super.loadUser(request);

        // 구글에서 받은 정보에서 email, name 꺼냄
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null || email.isBlank()) {
            throw new OAuth2AuthenticationException("Google account email not found");
        }

        // 회원가입 없으면 자동 회원가입
        User user = userRepository.findByEmail(email)
                .orElseGet(() ->
                        userRepository.save(
                                new User(email, "OAUTH2", name != null ? name : "GoogleUser")
                        )
                );

        return new CustomUserDetails(user);   // 사용자 반환
    }
}
