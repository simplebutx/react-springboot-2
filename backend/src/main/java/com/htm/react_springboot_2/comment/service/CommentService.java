package com.htm.react_springboot_2.comment.service;

import com.htm.react_springboot_2.comment.domain.Comment;
import com.htm.react_springboot_2.comment.dto.CommentListResponse;
import com.htm.react_springboot_2.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<CommentListResponse> getComments(Long postId) {

        return commentRepository.findByPostId(postId)
                .stream()
                .map(comment -> new CommentListResponse(comment.getId(), comment.getContent(), comment.getAuthor().getName(), comment.getCreatedAt()))
                .toList();
    }
}
