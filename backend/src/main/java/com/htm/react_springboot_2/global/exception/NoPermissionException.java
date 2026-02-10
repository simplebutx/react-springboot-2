package com.htm.react_springboot_2.global.exception;

public class NoPermissionException extends RuntimeException{
    public NoPermissionException() {
        super("접근 권한이 없습니다.");
    }

    public NoPermissionException(String message) {
        super(message);
    }
}
