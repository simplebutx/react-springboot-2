package com.htm.react_springboot_2.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PostDetailResponse {
    private String title;
    private String content;
    private String authorName;
    private Long authorId;
    private LocalDateTime createdAt;

    private boolean canEdit;
    private boolean canDelete;
}
