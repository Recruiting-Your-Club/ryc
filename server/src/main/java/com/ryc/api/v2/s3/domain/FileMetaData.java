package com.ryc.api.v2.s3.domain;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.s3.presentation.dto.request.PresignedUrlRequest;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileMetaData {
    private final String id;
    private final String filePath;
    private final String originalFileName;
    private final String contentType;
    private final Long fileSize;

    private final FileType fileType;

    private final String associatedId;

    private final String uploadedByUserId;

    private final FileStatus status;

    /**
     * create시 사용되는 정적 팩토리 메서드
     * @param request 업로드 요청 request dto
     * @param path s3 Key(prefix)
     * @param uploadedByUserId 업로드한 사용자 id
     * @return FileMetaData domain 객체
     */
    public static FileMetaData initialize(PresignedUrlRequest request, String path, String uploadedByUserId) {
        return FileMetaData.builder()
                .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
                .filePath(path)
                .originalFileName(request.fileName())
                .contentType(request.contentType())
                .fileType(FileType.from(request.fileType()))
                .associatedId(request.associatedId())
                .uploadedByUserId(uploadedByUserId)
                .status(FileStatus.PENDING)
                .build();
    }
}
