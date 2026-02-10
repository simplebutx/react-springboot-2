package com.htm.react_springboot_2.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@ToString
public class PostListResponse {
    private Long id;
    private String title;
    private String authorName;
    private LocalDateTime createdAt;
}
