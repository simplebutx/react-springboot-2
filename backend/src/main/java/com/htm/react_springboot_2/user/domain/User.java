package com.htm.react_springboot_2.user.domain;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.htm.react_springboot_2.auth.domain.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 기본생성자 추가
// AccessLevel.PROTECTED: 기본 생성자는 JPA만 쓰게하고, 외부에서는 마음대로 new 하지 못하게 막겠다
// @NoArgsConstructor 쓰는이유: JPA는 DB에서 데이터를 조회할때 빈 Post 객체를 생성하고, (기본생성자 이용)
// 그다음 필드값들을 채우기 때문에 반드시 기본 생성자가 필요하다
@Entity
@Table(name="users")
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // 회원가입용 생성자
    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = Role.USER;
    }
}
