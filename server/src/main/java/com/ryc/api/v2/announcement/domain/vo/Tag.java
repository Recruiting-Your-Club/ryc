package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;

@Builder
public record Tag(
        String label
) {
    public static Tag initialize(String label){
        return Tag.builder()
                .label(label)
                .build();
    }
}
