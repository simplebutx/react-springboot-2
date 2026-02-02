package com.htm.react_springboot_2.post.repository;

import com.htm.react_springboot_2.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
