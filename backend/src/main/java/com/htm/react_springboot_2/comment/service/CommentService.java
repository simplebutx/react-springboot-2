package com.htm.react_springboot_2.comment.service;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.comment.domain.Comment;
import com.htm.react_springboot_2.comment.dto.CommentCreateRequest;
import com.htm.react_springboot_2.comment.dto.CommentListResponse;
import com.htm.react_springboot_2.comment.dto.CommentUpdateRequest;
import com.htm.react_springboot_2.comment.repository.CommentRepository;
import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<CommentListResponse> getComments(Long postId, Long userId, Role role) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(comment -> {

                    boolean isAuthor = userId != null && comment.getAuthor().getId().equals(userId);
                    boolean isAdmin = role == Role.ADMIN;

                    return new CommentListResponse(
                            comment.getId(),
                            comment.getContent(),
                            comment.getAuthor().getName(),
                            comment.getAuthor().getId(),
                            comment.getCreatedAt(),
                            isAuthor, isAuthor || isAdmin
                    );
                })
                .toList();
    }

    @Transactional
    public void postComment(CommentCreateRequest dto, Long userId, Long postId) {
        User author = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("유저 없음"));
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("글 없음"));

        Comment comment = new Comment(dto.getContent(), author, post); // dto -> entity
        commentRepository.save(comment);
    }

    @Transactional
    public void updateComment(CommentUpdateRequest dto, Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()-> new IllegalArgumentException("댓글 없음"));

        if(!comment.getAuthor().getId().equals(userId)) {
            throw new IllegalArgumentException("작성자만 수정할 수 있습니다");
        }
        comment.updateComment(dto.getContent());
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId, boolean isAdmin) {
        Comment comment = commentRepository.findById(commentId)
                        .orElseThrow(()-> new IllegalArgumentException("댓글 없음"));

        boolean isAuthor = comment.getAuthor().getId().equals(userId);

        if (!isAuthor && !isAdmin) {
            throw new AccessDeniedException("작성자 또는 관리자만 삭제할 수 있습니다");
        }
        commentRepository.delete(comment);
    }
}
