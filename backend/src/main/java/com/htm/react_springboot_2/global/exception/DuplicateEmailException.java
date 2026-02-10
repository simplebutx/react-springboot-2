package com.htm.react_springboot_2.global.exception;

public class DuplicateEmailException extends RuntimeException{
    public DuplicateEmailException() {
        super("이미 가입된 이메일입니다.");
    }
}
