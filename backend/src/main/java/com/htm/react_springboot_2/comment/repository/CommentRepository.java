package com.htm.react_springboot_2.comment.repository;

import com.htm.react_springboot_2.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
    void deleteByAuthorId(Long userId);
}
