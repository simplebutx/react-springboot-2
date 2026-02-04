package com.htm.react_springboot_2.user.service;


import com.htm.react_springboot_2.post.dto.PostListResponse;
import com.htm.react_springboot_2.post.repository.PostRepository;
import com.htm.react_springboot_2.user.domain.User;
import com.htm.react_springboot_2.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public void withdraw(Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("유저 없음");
        }
        postRepository.deleteByAuthorId(userId);  // 자식(post)가 남아있으면 부모(user)를 삭제 못함
        userRepository.deleteById(userId);
    }

    public List<PostListResponse> getMyPosts(Long userId) {
        return postRepository.findByAuthorId(userId)
                .stream()
                .map(post -> new PostListResponse(post.getId(), post.getTitle(), post.getAuthor().getName(), post.getCreatedAt()))
                .toList();

    }
}
