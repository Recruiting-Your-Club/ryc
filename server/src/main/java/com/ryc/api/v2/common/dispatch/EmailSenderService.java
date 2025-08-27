package com.ryc.api.v2.common.dispatch;

import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender mailSender;
  private final EmailService emailService;

  @Scheduled(fixedDelay = 10000)
  public void sendPendingEmails() {
    List<Email> pendingEmails = emailService.findPendingEmails();

    for (Email mail : pendingEmails) {
      MimeMessage msg = mailSender.createMimeMessage();

      try {
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
        helper.setTo(mail.getRecipient());
        helper.setSubject(mail.getSubject());
        helper.setText(mail.getContent(), true);

        mailSender.send(msg);

        log.info("이메일 전송 완료: {}", mail.getRecipient());
        emailService.updateStatus(mail, EmailSentStatus.SENT);

      } catch (MailException e) {
        if (mail.getRetryCount() >= 3) {
          log.warn("이메일 재시도 초과로 실패: {}, 재시도 횟수: {}", mail.getRecipient(), mail.getRetryCount());
          emailService.updateStatus(mail, EmailSentStatus.FAILURE);

        } else {
          log.error(
              "이메일 전송 실패. 10초 후 재시도 예정: {}, 재시도 횟수: {}", mail.getRecipient(), mail.getRetryCount());
          emailService.incrementRetryCount(mail);
        }

      } catch (MessagingException e) {
        log.error("이메일 메시지 생성 실패: {}, 오류: {}", mail.getRecipient(), e.getMessage());
        emailService.updateStatus(mail, EmailSentStatus.FAILURE);
      }
    }
  }
}
