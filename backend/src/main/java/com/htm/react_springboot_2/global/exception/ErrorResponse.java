package com.htm.react_springboot_2.global.exception;

//dto임
public record ErrorResponse(int status, String message) {
}

// record: 값만 담는 클래스를 짧게 만드는 문법
// 불변필드, 생성자, getter 등 자동생성