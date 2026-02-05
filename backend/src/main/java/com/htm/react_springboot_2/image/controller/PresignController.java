package com.htm.react_springboot_2.image.controller;

import com.htm.react_springboot_2.image.service.PresignService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class PresignController {

    private final PresignService presignService;

    @GetMapping("/presign")
    public PresignService.PresignResponse presign(
            @RequestParam String contentType
    ) {
        return presignService.createPresignedUrl(contentType);
    }
}
