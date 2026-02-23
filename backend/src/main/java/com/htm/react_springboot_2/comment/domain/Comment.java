package com.htm.react_springboot_2.comment.domain;


import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.user.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class  Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public Comment(String content, User author, Post post) {
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.author = author;
        this.post = post;
    }

    public void updateComment(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }
}
