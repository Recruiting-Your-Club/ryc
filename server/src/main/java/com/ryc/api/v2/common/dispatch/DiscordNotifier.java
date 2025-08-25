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

import com.ryc.api.v2.common.exception.event.ServerErrorEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DiscordNotifier {

  private final String webhookUrl;
  private final RestTemplate restTemplate = new RestTemplate();

  public DiscordNotifier(@Value("${DISCORD_HOOK_URL}") String webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  @EventListener
  @Async
  protected void handleServerErrorEvent(ServerErrorEvent event) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    Map<String, Object> payload = Map.of("content", event.getMessage());

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
    try {
      restTemplate.postForEntity(webhookUrl, request, String.class);
      log.info("Sent Discord Webhook Message: {}", payload.get("content"));
    } catch (Exception e) {
      log.error("Failed to send Discord notification: {}", e.getMessage());
    }
  }
}
