package com.ryc.api.v2.email.domain;

import java.util.List;

public interface EmailRepository {

  List<Email> saveAll(List<Email> emails);
}
