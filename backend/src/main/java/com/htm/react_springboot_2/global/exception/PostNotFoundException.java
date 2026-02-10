package com.htm.react_springboot_2.global.exception;

public class PostNotFoundException extends RuntimeException{

    public PostNotFoundException() {
        super("게시글을 찾을 수 없습니다.");
    }

    public PostNotFoundException(String message) {    // 확장성 고려
        super(message);
    }
}
