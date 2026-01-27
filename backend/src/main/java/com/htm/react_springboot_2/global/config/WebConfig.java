package com.htm.react_springboot_2.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")    // /api로 시작하는 모든 요청에 대해 CORS 허용
                .allowedOrigins("http://localhost:5174")   // 이 프론트 주소만 요청 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")      // REST API 전부허용
                .allowedHeaders("*")    // 프론트가 요청 보낼때 헤더를 뭐를 달고 오든지 전부 허용
                .allowCredentials(true);    // 쿠키 / 세션 / 인증정보 사용 허용
    }
}
