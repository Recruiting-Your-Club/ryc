package com.ryc.api.v2.common.dispatch;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ryc.api.v2.common.exception.event.DiscordGeneralErrorEvent;
import com.ryc.api.v2.common.exception.event.DiscordInternalServerErrorEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DiscordNotifier {

  private final String serverErrorWebhookUrl;
  private final String generalErrorWebhookUrl;
  private final RestTemplate restTemplate = new RestTemplate();

  public DiscordNotifier(
      @Value("${discord.server.error-hook-url}") String serverErrorWebhookUrl,
      @Value("${discord.general.error-hook-url}") String generalErrorWebhookUrl) {
    this.serverErrorWebhookUrl = serverErrorWebhookUrl;
    this.generalErrorWebhookUrl = generalErrorWebhookUrl;
  }

  @EventListener
  @Async
  protected void handleDiscordInternalServerErrorEvent(DiscordInternalServerErrorEvent event) {
    sendDiscordNotification(serverErrorWebhookUrl, event.getMessage());
  }

  @EventListener
  @Async
  protected void handleGeneralDiscordErrorEvent(DiscordGeneralErrorEvent event) {
    sendDiscordNotification(generalErrorWebhookUrl, event.getMessage());
  }

  private void sendDiscordNotification(String webhookUrl, String message) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, Object> payload = Map.of("content", message);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
    try {
      restTemplate.postForEntity(webhookUrl, request, String.class);
    } catch (Exception e) {
      log.error("Failed to send Discord notification: {}", e.getMessage());
    }
  }
}
