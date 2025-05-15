package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Builder
@Getter
public class Image {
    private final String thumbnail_url;
    private final String image_url;
    private final int order;

    @Override
    public int hashCode() {
        return Objects.hash(thumbnail_url, image_url, order);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Image image = (Image) obj;
        return order == image.order &&
               Objects.equals(thumbnail_url, image.thumbnail_url) &&
               Objects.equals(image_url, image.image_url);
    }
}
