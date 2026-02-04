package com.htm.react_springboot_2.comment.controller;

import com.htm.react_springboot_2.comment.dto.CommentListResponse;
import com.htm.react_springboot_2.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/api/posts/{postId}/comments")
    public List<CommentListResponse> getComments(@PathVariable Long postId) {
        return commentService.getComments(postId);
    }
}
