package com.htm.react_springboot_2.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor

public class PostListResponse {
    private Long id;
    private String title;
    private String authorName;
    private LocalDateTime createdAt;
}
