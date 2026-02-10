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

    @ManyToOne(fetch = FetchType.LAZY)  // @ManyToOne: Post(N) : User(1) 관계, User Entity를 객체로 참조
    @JoinColumn(name = "user_id")   // Post 테이블에 user_id 칼럼을 만들거임. 그리고 해당 칼럼은 user테이블의 id (PK)를 참조하는 FK 이다
    private User author;
    // @ManyToOne: 여러개(N)의 Post가 하나(1)의 User에 속한다  [=같은 User를 참조하는 Post는 여러 개일 수 있다]
    // FK는 항상 N쪽 테이블에 있다
    // FetchType.LAZY: User가 필요할때만 User를 조회

    @Column(name = "image_key")
    private String imageKey;  // S3 객체의 키(식별자) 저장

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
