package com.ryc.api.v2.util;

import jakarta.servlet.http.HttpServletRequest;

public class UrlUtil {

  private UrlUtil() {
    throw new IllegalStateException("Utility class");
  }

  public static String getRequestUrl(HttpServletRequest request) {
    String serverName = request.getServerName();
    int serverPort = request.getServerPort();

    StringBuilder baseUrl = new StringBuilder();
    baseUrl.append("https://").append(request.getServerName());

    // localhost인 경우에만 포트 추가
    if (serverName.equals("localhost")) {
      baseUrl.append(":").append(serverPort);
    }

    return baseUrl.toString();
  }
}
