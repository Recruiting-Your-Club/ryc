package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailSentStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender mailSender;
  private final EmailService emailService;

  @Scheduled(fixedDelay = 10000)
  public void sendPendingEmails() {
    List<Email> updatedEmails = new ArrayList<>();
    List<Email> pendingEmails = emailService.findPendingEmails();

    for (Email mail : pendingEmails) {
      MimeMessage msg = mailSender.createMimeMessage();

      try {
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
        helper.setTo(mail.recipient());
        helper.setSubject(mail.subject());
        helper.setText(mail.content(), true);

        mailSender.send(msg);

        updatedEmails.add(mail.updateStatus(EmailSentStatus.SENT));
        log.info("이메일 전송 완료: {}", mail.recipient());

      } catch (MailException e) {
        updatedEmails.add(mail.incrementRetryCount());

        if (mail.retryCount() >= 3) {
          updatedEmails.add(mail.updateStatus(EmailSentStatus.FAILURE));
          log.warn("이메일 재시도 초과로 실패: {}, 재시도 횟수: {}", mail.recipient(), mail.retryCount());

        } else {
          log.error("이메일 전송 실패 10초 후 재시도 예정: {}, 재시도 횟수: {}", mail.recipient(), mail.retryCount());
        }

      } catch (MessagingException e) {
        updatedEmails.add(mail.updateStatus(EmailSentStatus.FAILURE));
        log.error("이메일 메시지 생성 실패: {}, 오류: {}", mail.recipient(), e.getMessage());
      }
    }

    // 이메일 전송 후 상태 업데이트
    emailService.saveAll(updatedEmails);
  }
}
