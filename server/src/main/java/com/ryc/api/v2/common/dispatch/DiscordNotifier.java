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
      @Value("${DISCORD_SERVER_ERROR_HOOK_URL}") String serverErrorWebhookUrl,
      @Value("${DISCORD_GENERAL_ERROR_HOOK_URL}") String generalErrorWebhookUrl) {
    this.serverErrorWebhookUrl = serverErrorWebhookUrl;
    this.generalErrorWebhookUrl = generalErrorWebhookUrl;
  }

  @EventListener
  @Async
  protected void handleDiscordInternalServerErrorEvent(DiscordInternalServerErrorEvent event) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, Object> payload = Map.of("content", event.getMessage());

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
    try {
      restTemplate.postForEntity(serverErrorWebhookUrl, request, String.class);
      log.info("Sent Discord Webhook Message: {}", payload.get("content"));
    } catch (Exception e) {
      log.error("Failed to send Discord notification: {}", e.getMessage());
    }
  }

  @EventListener
  @Async
  protected void handleGeneralDiscordErrorEvent(DiscordGeneralErrorEvent event) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, Object> payload = Map.of("content", event.getMessage());

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
    try {
      restTemplate.postForEntity(generalErrorWebhookUrl, request, String.class);
      log.info("Sent Discord Webhook Message: {}", payload.get("content"));
    } catch (Exception e) {
      log.error("Failed to send Discord notification: {}", e.getMessage());
    }
  }
}
