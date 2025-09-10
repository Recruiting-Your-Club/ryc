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
  protected void sendPendingEmails() {
    List<Email> pendingEmails = emailService.findPendingEmails();

    pendingEmails.forEach(
        email -> {
          try {
            sendEmail(email);
          } catch (MailException e) {
            if (email.getRetryCount() >= 3) {
              log.warn(
                  "이메일 재시도 초과로 실패: {}, 재시도 횟수: {}", email.getRecipient(), email.getRetryCount());
              emailService.updateStatus(email, EmailSentStatus.FAILURE);

            } else {
              log.error(
                  "이메일 전송 실패. 10초 후 재시도 예정: {}, 재시도 횟수: {}",
                  email.getRecipient(),
                  email.getRetryCount());
              emailService.incrementRetryCount(email);
            }

          } catch (MessagingException e) {
            log.error("이메일 메시지 생성 실패: {}, 오류: {}", email.getRecipient(), e.getMessage());
            emailService.updateStatus(email, EmailSentStatus.FAILURE);
          }

          log.info("이메일 전송 완료: {}", email.getRecipient());
          emailService.updateStatus(email, EmailSentStatus.SENT);
        });
  }

  @Scheduled(cron = "0 * * * * *")
  protected void sendInterviewNotifications() {}

  private void sendEmail(Email mail) throws MessagingException {
    MimeMessage msg = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");

    helper.setTo(mail.getRecipient());
    helper.setSubject(mail.getSubject());
    helper.setText(mail.getContent(), true);

    mailSender.send(msg);
  }
}
