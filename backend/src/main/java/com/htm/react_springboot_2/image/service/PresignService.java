package com.htm.react_springboot_2.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PresignService {

    private final S3Presigner presigner;

    @Value("${aws.s3.bucket}")
    private String bucket;

    public PresignResponse createPresignedUrl(String contentType) {

        String ext = contentType.equals("image/png") ? ".png" : ".jpg";   // 파일 확장자 설정
        String filename = UUID.randomUUID() + ext;   // 파일명 설정  // UUID: 중복 방지

        String key = "react-springboot-2/images/posts/" + filename;   // key

        PutObjectRequest objectRequest =     // 이파일을 이버킷에 이key로 이타입으로 올릴거다
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(contentType)
                        .build();

        PutObjectPresignRequest presignRequest =      // Presigned URL 생성
                PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(5))    // 5분동안 유요한 업로드 URL
                        .putObjectRequest(objectRequest)
                        .build();

        PresignedPutObjectRequest presigned =
                presigner.presignPutObject(presignRequest);

        return new PresignResponse(presigned.url().toString(), key);   // S3에 PUT가능한 임시 URL + DB에 저장할 Key
    }

    public record PresignResponse(String url, String key) {}
}
