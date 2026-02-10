package com.htm.react_springboot_2.post.service;

import com.htm.react_springboot_2.auth.domain.Role;
import com.htm.react_springboot_2.global.dto.PageResponse;
import com.htm.react_springboot_2.global.exception.NoPermissionException;
import com.htm.react_springboot_2.global.exception.PostNotFoundException;
import com.htm.react_springboot_2.global.exception.UserNotFoundException;
import com.htm.react_springboot_2.post.domain.Post;
import com.htm.react_springboot_2.post.dto.*;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<PostListResponse> getPosts(int page, int size, String keyword) {

        // page번째 페이지를 size개 만큼 최신순으로
        PageRequest pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();    // keyword가 null도 아니고 공백도 아니면 true // trim() - 양쪽끝 공백문자 제거
        String q = hasKeyword ? keyword.trim() : null;     // 공백제거

        // Page 인터페이스 = 페이징된 조회결과 + 페이징 메타데이터를 함께담는 컨테이너
        Page<Post> result = hasKeyword   // 검색한게 있으면 보여주고 없으면 전체 목록 페이징
                ? postRepository.searchByTitleOrContent(q, pageable)
                : postRepository.findAll(pageable);

        Page<PostListResponse> mapped = result  // db에서 가져올때 필요한 페이지만 가져옴
                .map(post -> new PostListResponse(     // Page<Post> -> Page<PostListResponse> 변환 (Entity -> DTO)
                        post.getId(),
                        post.getTitle(),
                        post.getAuthor().getName(),
                        post.getCreatedAt()
                ));

        return PageResponse.of(mapped);   // Page<PostListResponse> -> PageResponse<PostListResponse> 변환 (DTO -> DTO) // Page<>는 데이터가 너무많으니 필요한것만 담아가자)
    }

    @Transactional
    public void createPost(PostCreateRequest dto, String email) {
        User author = userRepository.findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException());
        Post post = new Post(dto.getTitle(), dto.getContent(), dto.getImageKey(), author);
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPostDetail(Long postId, Long loginUserId, Role role) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);
        boolean isAdmin = role == Role.ADMIN;

        return new PostDetailResponse(post.getTitle(), post.getContent(), post.getImageKey(),
                post.getAuthor().getName(), post.getAuthor().getId(), post.getCreatedAt(),
                isAuthor, isAuthor || isAdmin);
    }

    @Transactional
    public void updatePost(PostUpdateRequest dto, Long postId, Long loginUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        if(!post.getAuthor().getId().equals(loginUserId)) {
            throw new NoPermissionException("작성자만 수정할 수 있습니다");
        }

        post.updatePost(dto.getTitle(), dto.getContent(), dto.getImageKey());
    }

    @Transactional
    public void deletePost(Long postId, Long loginUserId, boolean isAdmin) {
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new PostNotFoundException());

        boolean isAuthor = post.getAuthor().getId().equals(loginUserId);

        if (!isAuthor && !isAdmin) {
            throw new NoPermissionException("작성자 또는 관리자만 삭제할 수 있습니다");
        }
        postRepository.delete(post);
    }
}
