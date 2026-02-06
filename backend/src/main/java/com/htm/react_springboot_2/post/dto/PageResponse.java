package com.htm.react_springboot_2.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@AllArgsConstructor
// 데이터 목록 + 페이지 정보 묶어서 프론트로 보내는 박스
public class PageResponse<T> {    // 여기서 제네릭 쓰는 이유는 재사용하려고
    private List<T> items;   // 여기에 PostListResponse DTO (글 정보)가 들어감. 나머지 필드는 페이지 정보들
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    // Page<T> -> PageResponse<T>로 변환하는 팩토리 메서드
    // 펙토리 메서드: new 대신 쓰는 객체 생성용 메서드
    public static <T> PageResponse<T> of(Page<T> p) {
        return new PageResponse<>(
                p.getContent(),
                p.getNumber(),
                p.getSize(),
                p.getTotalElements(),
                p.getTotalPages()
        );
    }
}
