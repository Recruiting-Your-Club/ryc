package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender mailSender;

  public List<EmailSendResponse> sendEmails(List<Email> emails) throws MessagingException {
    List<EmailSendResponse> responses = new ArrayList<>();
    MailException mailException = null;
    MessagingException messagingException = null;

    for (int i = 0; i < emails.size(); i++) {
      Email mail = emails.get(i);
      MimeMessage msg = mailSender.createMimeMessage();

      try {
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
        helper.setTo(mail.recipient());
        helper.setSubject(mail.subject());
        helper.setText(mail.content(), true);

        mailSender.send(msg);

        mail = mail.updateStatus(EmailSentStatus.SUCCESS);
        responses.add(new EmailSendResponse(mail.recipient(), EmailSentStatus.SUCCESS));

      } catch (MailException e) {
        mailException = e;
        mail = mail.updateStatus(EmailSentStatus.FAILURE);
        responses.add(new EmailSendResponse(mail.recipient(), EmailSentStatus.FAILURE));

      } catch (MessagingException e) {
        messagingException = e;
        mail = mail.updateStatus(EmailSentStatus.FAILURE);
        responses.add(new EmailSendResponse(mail.recipient(), EmailSentStatus.FAILURE));
      } finally {
        // 이메일 전송 후 상태 업데이트
        emails.set(i, mail);
      }
    }

    if (!isEmailSentSuccessfully(responses)) {
      // 하나라도 성공한 이메일이 없으면 예외를 던진다.
      if (mailException != null) throw mailException;
      if (messagingException != null) throw messagingException;
    }

    return responses;
  }

  private boolean isEmailSentSuccessfully(List<EmailSendResponse> responses) {
    for (EmailSendResponse response : responses) {
      if (response.emailSentStatus() == EmailSentStatus.SUCCESS) {
        return true;
      }
    }

    return false;
  }
}
