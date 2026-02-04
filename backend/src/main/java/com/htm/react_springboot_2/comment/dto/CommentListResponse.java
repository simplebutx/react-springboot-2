package com.htm.react_springboot_2.comment.dto;

import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentListResponse {
    private Long id;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;
}
