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

        String ext = contentType.equals("image/png") ? ".png" : ".jpg";
        String filename = UUID.randomUUID() + ext;

        String key = "react-springboot-2/images/posts/" + filename;

        PutObjectRequest objectRequest =
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(contentType)
                        .build();

        PutObjectPresignRequest presignRequest =
                PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(5))
                        .putObjectRequest(objectRequest)
                        .build();

        PresignedPutObjectRequest presigned =
                presigner.presignPutObject(presignRequest);

        return new PresignResponse(presigned.url().toString(), key);
    }

    public record PresignResponse(String url, String key) {}
}
