package com.htm.react_springboot_2.comment.controller;

import com.htm.react_springboot_2.auth.domain.CustomUserDetails;
import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.comment.dto.CommentCreateRequest;
import com.htm.react_springboot_2.comment.dto.CommentListResponse;
import com.htm.react_springboot_2.comment.dto.CommentUpdateRequest;
import com.htm.react_springboot_2.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/api/posts/{postId}/comments")
    public List<CommentListResponse> getComments(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return commentService.getComments(postId, userDetails.getId(), userDetails.getRole());
    }

    @PostMapping("/api/posts/{postId}/comments")
    public ResponseEntity<Void> postComment(@RequestBody CommentCreateRequest dto, @AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) {
        commentService.postComment(dto, userDetails.getId(), postId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/posts/{postId}/comments/{commentId}")
    public ResponseEntity<Void> updateComment(@RequestBody CommentUpdateRequest dto, @PathVariable Long commentId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentService.updateComment(dto, commentId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/api/posts/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId,@AuthenticationPrincipal CustomUserDetails userDetails) {
        boolean isAdmin = userDetails.getRole() == Role.ADMIN;
        commentService.deleteComment(commentId, userDetails.getId() ,isAdmin);
        return ResponseEntity.noContent().build();
    }
}
