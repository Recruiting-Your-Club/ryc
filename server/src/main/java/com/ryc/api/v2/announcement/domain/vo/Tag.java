package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Builder
@Getter
public class Tag {
    private final String label;
    private final int order;

    @Override
    public int hashCode() {
        return Objects.hash(this.label,order);
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj == null || getClass() != obj.getClass()) return false;

        Tag tag = (Tag) obj;
        return  order == tag.order && Objects.equals(label, tag.label);
    }
}
