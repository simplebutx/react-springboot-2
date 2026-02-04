package com.htm.react_springboot_2.post.repository;

import com.htm.react_springboot_2.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // author(user)테이블의 id칼럼을 기준으로 찾는 함수
    void deleteByAuthorId(Long userId);
    List<Post> findByAuthorId(Long userId);
}
