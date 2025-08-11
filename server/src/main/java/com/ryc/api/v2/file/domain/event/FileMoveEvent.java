package com.ryc.api.v2.file.domain.event;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import lombok.Getter;

@Getter
public class FileMoveEvent extends ApplicationEvent {
  private final List<FileMoveRequest> requests;

  public FileMoveEvent(Object source, List<FileMoveRequest> requests) {
    super(source);
    this.requests = requests;
  }
}
