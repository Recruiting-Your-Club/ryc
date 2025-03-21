package com.ryc.api.v2.club.domain;

import lombok.Builder;
import lombok.Getter;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

@Getter
public class ClubTag {
    private final String id;
    private String name;

    @Builder
    private ClubTag(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static ClubTag initialize(String name){
        return ClubTag.builder()
                .id(DEFAULT_INITIAL_ID)
                .name(name)
                .build();
    }

    public void updateName(final String name){
        this.name= name;
    }
}
