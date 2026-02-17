package com.htm.react_springboot_2.post.domain;


import com.htm.react_springboot_2.comment.domain.Comment;
import com.htm.react_springboot_2.user.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;


    @Column(name = "image_key")
    private String imageKey;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)   // Post 삭제시 자식인 Comment도 자동삭제
    private List<Comment> comments = new ArrayList<>();

    public Post(String title, String content, String imageKey, User author) {
        this.title = title;
        this.content = content;
        this.imageKey = imageKey;
        this.author = author;
        this.createdAt = LocalDateTime.now();
    }

    public void updatePost(String title, String content, String imageKey) {
        this.title = title;
        this.content = content;
        this.imageKey = imageKey;
    }

}
