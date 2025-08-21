package com.ryc.api.v2.common.util;

import java.util.Collections;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class HtmlImageParser {

  public List<String> extractImageIds(String htmlContent) {
    if (!StringUtils.hasText(htmlContent)) {
      return Collections.emptyList();
    }

    Document doc = Jsoup.parse(htmlContent);
    Elements images = doc.select("img[file-metadata-id]");

    return images.stream()
        .map(image -> image.attr("file-metadata-id"))
        .filter(StringUtils::hasText)
        .distinct()
        .toList();
  }
}
