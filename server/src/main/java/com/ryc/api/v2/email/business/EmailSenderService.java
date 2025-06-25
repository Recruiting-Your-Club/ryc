package com.ryc.api.v2.email.business;

import com.ryc.api.v2.email.domain.EmailStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender mailSender;

  public List<EmailSendResponse> sendEmails(EmailSendRequest body) {
    List<EmailSendResponse> result = new ArrayList<>();

    for (String recipient : body.recipients()) {
      try {
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");

        helper.setTo(recipient);
        helper.setSubject(body.subject());
        helper.setText(body.content(), true);

        mailSender.send(msg);
        result.add(new EmailSendResponse(recipient, EmailStatus.SUCCESS));
      } catch (Exception e) {

        result.add(new EmailSendResponse(recipient, EmailStatus.FAILURE));
      }
    }

    return result;
  }
}
