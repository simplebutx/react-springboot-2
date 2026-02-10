package com.htm.react_springboot_2.post.repository;

import com.htm.react_springboot_2.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // author(user)테이블의 id칼럼을 기준으로 찾는 함수
    void deleteByAuthorId(Long userId);
    List<Post> findByAuthorId(Long userId);

    @Query("""
    select p from Post p
    where p.title like concat('%', :q, '%')
       or p.content like concat('%', :q, '%')
""")
    Page<Post> searchByTitleOrContent(@Param("q") String q, Pageable pageable);
    // 제목이나 내용에 검색어가 포함된 게시물을 페이징해서 조회
    // @Param: 쿼리 문자열의 변수 이름과 메서드 인자를 매핑

    // JPA로 쓰면
    // Page<Post> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);
}
