package com.htm.react_springboot_2.user.repository;

import com.htm.react_springboot_2.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("""
            select p from User p
            where p.email like concat('%', :q, '%')
            or p.name like concat('%', :q, '%')
            """)
    Page<User> searchByEmailorName(@Param("q") String q, Pageable pageable);
}
