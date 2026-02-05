package com.htm.react_springboot_2.comment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentCreateRequest {
    @NotBlank(message = "댓글 내용을 입력해주세요.")
    private String content;
}
