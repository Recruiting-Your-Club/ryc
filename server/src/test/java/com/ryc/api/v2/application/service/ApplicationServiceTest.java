package com.ryc.api.v2.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.applicant.infra.ApplicantRepositoryImpl;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantCreateRequest;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotency;
import com.ryc.api.v2.application.infra.ApplicationSubmissionIdempotencyRepositoryImpl;
import com.ryc.api.v2.application.infra.jpa.ApplicationJpaRepository;
import com.ryc.api.v2.application.infra.jpa.ApplicationSubmissionIdempotencyJpaRepository;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationCreateRequest;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.email.service.EmailService;
import com.ryc.api.v2.file.service.FileService;

@SpringBootTest(
    properties =
        "spring.datasource.url=jdbc:h2:mem:application-service-test;MODE=MySQL;NON_KEYWORDS=VALUE")
@ActiveProfiles("test")
class ApplicationServiceTest {

  @Autowired ApplicationService applicationService;

  @Autowired ApplicantJpaRepository applicantJpaRepository;

  @Autowired ApplicationJpaRepository applicationJpaRepository;

  @Autowired ApplicationSubmissionIdempotencyJpaRepository idempotencyJpaRepository;

  @MockBean AnnouncementRepository announcementRepository;

  @MockBean FileService fileService;

  @MockBean EmailService emailService;

  @SpyBean ApplicantRepositoryImpl applicantRepository;

  @SpyBean ApplicationSubmissionIdempotencyRepositoryImpl idempotencyRepository;

  private ApplicationForm applicationForm;

  @BeforeEach
  void setUp() {
    idempotencyJpaRepository.deleteAll();
    idempotencyJpaRepository.flush();
    applicationJpaRepository.deleteAll();
    applicationJpaRepository.flush();
    applicantJpaRepository.deleteAll();
    applicantJpaRepository.flush();

    applicationForm = mock(ApplicationForm.class);
    when(applicationForm.getApplicationQuestions()).thenReturn(List.of());
    when(applicationForm.getPreQuestions()).thenReturn(List.of());
    when(applicationForm.getPersonalInfoQuestionTypes()).thenReturn(List.of());
  }

  @Test
  @DisplayName("사용자가 공고에 처음 지원하면 지원자와 지원서가 생성된다")
  void submitApplication_givenFirstApplication_succeeds() {
    String announcementId = UUID.randomUUID().toString();
    String email = "first-applicant@example.com";
    stubRecruitingAnnouncement();

    ApplicationSubmissionResponse response =
        applicationService.submitApplication(createRequest(email), announcementId);

    assertThat(response.applicantId()).isNotBlank();
    assertThat(response.applicationId()).isNotBlank();
    assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
    assertThat(applicationJpaRepository.count()).isEqualTo(1);
  }

  @Test
  @DisplayName("동일 사용자가 동일 공고에 다시 지원하면 추가 지원서가 생성되지 않는다")
  void submitApplication_givenDuplicateApplication_throwsBusinessRuleException() {
    String announcementId = UUID.randomUUID().toString();
    String email = "duplicate-applicant@example.com";
    stubRecruitingAnnouncement();

    applicationService.submitApplication(createRequest(email), announcementId);

    Throwable thrown =
        catchThrowable(
            () -> applicationService.submitApplication(createRequest(email), announcementId));

    assertThat(thrown).isInstanceOf(BusinessRuleException.class);
    assertThat(((BusinessRuleException) thrown).getErrorCode())
        .isEqualTo(ApplicationCreateErrorCode.DUPLICATE_APPLICATION);
    assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
    assertThat(applicationJpaRepository.count()).isEqualTo(1);
  }

  @Test
  @DisplayName("동일한 멱등키로 같은 요청을 재시도하면 기존 지원 결과를 반환한다")
  void submitApplication_givenSameIdempotencyKey_returnsExistingResponse() {
    String announcementId = UUID.randomUUID().toString();
    String email = "idempotent-applicant@example.com";
    String idempotencyKey = UUID.randomUUID().toString();
    stubRecruitingAnnouncement();

    ApplicationSubmissionResponse firstResponse =
        applicationService.submitApplication(createRequest(email), announcementId, idempotencyKey);
    ApplicationSubmissionResponse retryResponse =
        applicationService.submitApplication(createRequest(email), announcementId, idempotencyKey);

    assertThat(retryResponse).isEqualTo(firstResponse);
    assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
    assertThat(applicationJpaRepository.count()).isEqualTo(1);
    assertThat(idempotencyJpaRepository.count()).isEqualTo(1);
  }

  @Test
  @DisplayName("같은 멱등키로 다른 요청을 보내면 거부한다")
  void submitApplication_givenSameIdempotencyKeyWithDifferentRequest_rejectsRequest() {
    String announcementId = UUID.randomUUID().toString();
    String idempotencyKey = UUID.randomUUID().toString();
    stubRecruitingAnnouncement();

    applicationService.submitApplication(
        createRequest("first-idempotent-applicant@example.com"), announcementId, idempotencyKey);

    Throwable thrown =
        catchThrowable(
            () ->
                applicationService.submitApplication(
                    createRequest("second-idempotent-applicant@example.com"),
                    announcementId,
                    idempotencyKey));

    assertThat(thrown).isInstanceOf(BusinessRuleException.class);
    assertThat(((BusinessRuleException) thrown).getErrorCode())
        .isEqualTo(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_REUSED);
    assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
    assertThat(applicationJpaRepository.count()).isEqualTo(1);
  }

  @Test
  @DisplayName("동일 사용자는 서로 다른 공고에 각각 지원할 수 있다")
  void submitApplication_givenDifferentAnnouncements_allowsBothApplications() {
    String firstAnnouncementId = UUID.randomUUID().toString();
    String secondAnnouncementId = UUID.randomUUID().toString();
    String email = "multi-announcement@example.com";
    stubRecruitingAnnouncement();

    applicationService.submitApplication(createRequest(email), firstAnnouncementId);
    applicationService.submitApplication(createRequest(email), secondAnnouncementId);

    assertThat(applicantJpaRepository.findAllByAnnouncementId(firstAnnouncementId)).hasSize(1);
    assertThat(applicantJpaRepository.findAllByAnnouncementId(secondAnnouncementId)).hasSize(1);
    assertThat(applicationJpaRepository.count()).isEqualTo(2);
  }

  @Test
  @DisplayName("서로 다른 사용자는 동일 공고에 각각 지원할 수 있다")
  void submitApplication_givenDifferentApplicants_allowsBothApplications() {
    String announcementId = UUID.randomUUID().toString();
    stubRecruitingAnnouncement();

    applicationService.submitApplication(createRequest("first-user@example.com"), announcementId);
    applicationService.submitApplication(createRequest("second-user@example.com"), announcementId);

    assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(2);
    assertThat(applicationJpaRepository.count()).isEqualTo(2);
  }

  @Test
  @DisplayName("동일 사용자와 공고의 동시 지원 요청은 하나만 저장된다")
  void submitApplication_givenConcurrentDuplicateRequests_savesOnlyOneApplication()
      throws Exception {
    String announcementId = UUID.randomUUID().toString();
    String email = "concurrent-applicant@example.com";
    stubRecruitingAnnouncement();

    CyclicBarrier duplicateCheckBarrier = new CyclicBarrier(2);
    AtomicInteger duplicateCheckCount = new AtomicInteger();
    doAnswer(
            invocation -> {
              if (duplicateCheckCount.incrementAndGet() <= 2) {
                try {
                  duplicateCheckBarrier.await(10, TimeUnit.SECONDS);
                } catch (Exception e) {
                  throw new IllegalStateException("동시성 테스트용 중복 검사 동기화에 실패했습니다.", e);
                }
              }
              return invocation.callRealMethod();
            })
        .when(applicantRepository)
        .existsByAnnouncementIdAndEmail(eq(announcementId), eq(email));

    ExecutorService executor = Executors.newFixedThreadPool(2);
    CountDownLatch start = new CountDownLatch(1);
    try {
      Future<Object> first =
          executor.submit(() -> submitAfter(start, announcementId, createRequest(email)));
      Future<Object> second =
          executor.submit(() -> submitAfter(start, announcementId, createRequest(email)));
      start.countDown();

      Object firstResult = first.get(20, TimeUnit.SECONDS);
      Object secondResult = second.get(20, TimeUnit.SECONDS);

      List<Object> results = List.of(firstResult, secondResult);
      assertThat(results.stream().filter(ApplicationSubmissionResponse.class::isInstance).count())
          .isEqualTo(1);
      assertThat(results.stream().filter(BusinessRuleException.class::isInstance).count())
          .isEqualTo(1);
      assertThat(
              results.stream()
                  .filter(BusinessRuleException.class::isInstance)
                  .map(BusinessRuleException.class::cast)
                  .map(BusinessRuleException::getErrorCode))
          .containsOnly(ApplicationCreateErrorCode.DUPLICATE_APPLICATION);

      assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
      assertThat(applicationJpaRepository.count()).isEqualTo(1);
    } finally {
      executor.shutdownNow();
      executor.awaitTermination(5, TimeUnit.SECONDS);
    }
  }

  @Test
  @DisplayName("동일한 멱등키의 동시 요청은 하나의 결과를 공유한다")
  void submitApplication_givenConcurrentSameIdempotencyKey_returnsSameResponse() throws Exception {
    String announcementId = UUID.randomUUID().toString();
    String email = "concurrent-idempotent-applicant@example.com";
    String idempotencyKey = UUID.randomUUID().toString();
    stubRecruitingAnnouncement();

    CyclicBarrier reservationBarrier = new CyclicBarrier(2);
    AtomicInteger reservationCount = new AtomicInteger();
    doAnswer(
            invocation -> {
              ApplicationSubmissionIdempotency idempotency = invocation.getArgument(0);
              if (idempotency.getApplicantId() == null && reservationCount.incrementAndGet() <= 2) {
                try {
                  reservationBarrier.await(10, TimeUnit.SECONDS);
                } catch (Exception e) {
                  throw new IllegalStateException("동시성 테스트용 멱등키 예약 동기화에 실패했습니다.", e);
                }
              }
              return invocation.callRealMethod();
            })
        .when(idempotencyRepository)
        .save(org.mockito.ArgumentMatchers.any(ApplicationSubmissionIdempotency.class));

    ExecutorService executor = Executors.newFixedThreadPool(2);
    CountDownLatch start = new CountDownLatch(1);
    try {
      Future<Object> first =
          executor.submit(
              () -> submitAfter(start, announcementId, createRequest(email), idempotencyKey));
      Future<Object> second =
          executor.submit(
              () -> submitAfter(start, announcementId, createRequest(email), idempotencyKey));
      start.countDown();

      Object firstResult = first.get(20, TimeUnit.SECONDS);
      Object secondResult = second.get(20, TimeUnit.SECONDS);

      assertThat(firstResult).isInstanceOf(ApplicationSubmissionResponse.class);
      assertThat(secondResult).isInstanceOf(ApplicationSubmissionResponse.class);
      assertThat(secondResult).isEqualTo(firstResult);
      assertThat(applicantJpaRepository.findAllByAnnouncementId(announcementId)).hasSize(1);
      assertThat(applicationJpaRepository.count()).isEqualTo(1);
      assertThat(idempotencyJpaRepository.count()).isEqualTo(1);
    } finally {
      executor.shutdownNow();
      executor.awaitTermination(5, TimeUnit.SECONDS);
    }
  }

  private Object submitAfter(
      CountDownLatch start, String announcementId, ApplicationSubmissionRequest request) {
    return submitAfter(start, announcementId, request, UUID.randomUUID().toString());
  }

  private Object submitAfter(
      CountDownLatch start,
      String announcementId,
      ApplicationSubmissionRequest request,
      String idempotencyKey) {
    try {
      if (!start.await(10, TimeUnit.SECONDS)) {
        throw new IllegalStateException("동시성 테스트 시작 신호를 받지 못했습니다.");
      }
      return applicationService.submitApplication(request, announcementId, idempotencyKey);
    } catch (Throwable throwable) {
      return throwable;
    }
  }

  private void stubRecruitingAnnouncement() {
    Announcement announcement = mock(Announcement.class);
    when(announcement.getAnnouncementStatus()).thenReturn(AnnouncementStatus.RECRUITING);
    when(announcement.getApplicationForm()).thenReturn(applicationForm);
    when(announcement.getId()).thenReturn(UUID.randomUUID().toString());
    when(announcement.getTitle()).thenReturn("테스트 공고");
    when(announcementRepository.findById(anyString())).thenReturn(announcement);
    when(announcementRepository.findClubNameByAnnouncementId(anyString())).thenReturn("테스트 동아리");
  }

  private ApplicationSubmissionRequest createRequest(String email) {
    ApplicantCreateRequest applicant =
        ApplicantCreateRequest.builder().email(email).name("홍길동").personalInfos(List.of()).build();
    ApplicationCreateRequest application =
        ApplicationCreateRequest.builder().answers(List.of()).build();
    return ApplicationSubmissionRequest.builder()
        .applicant(applicant)
        .application(application)
        .build();
  }
}
