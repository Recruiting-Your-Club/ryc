package com.ryc.api.v2.email.domain;

import java.util.List;

public interface EmailRepository {

  List<String> saveAll(List<Email> emails);
}
