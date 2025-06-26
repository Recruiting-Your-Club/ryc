package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender mailSender;

  public List<EmailSendResponse> sendEmails(EmailSendRequest body) throws MessagingException {
    List<EmailSendResponse> responses = new ArrayList<>();
    MailException mailException = null;
    MessagingException messagingException = null;

    for (String recipient : body.recipients()) {
      try {
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");

        helper.setTo(recipient);
        helper.setSubject(body.subject());
        helper.setText(body.content(), true);

        mailSender.send(msg);
        responses.add(new EmailSendResponse(recipient, EmailSentStatus.SUCCESS));
      } catch (MailException e) {
        mailException = e;
        responses.add(new EmailSendResponse(recipient, EmailSentStatus.FAILURE));
      } catch (MessagingException e) {
        messagingException = e;
        responses.add(new EmailSendResponse(recipient, EmailSentStatus.FAILURE));
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
