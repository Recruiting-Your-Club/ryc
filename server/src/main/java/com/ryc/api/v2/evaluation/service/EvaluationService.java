package com.ryc.api.v2.evaluation.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.event.ApplicantDeletedEvent;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.domain.EvaluationRepository;
import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.presentation.dto.request.*;
import com.ryc.api.v2.evaluation.presentation.dto.response.*;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.ClubRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationService {
  private final EvaluationRepository evaluationRepository;
  private final AdminRepository adminRepository;
  private final ClubRoleRepository clubRoleRepository;
  private final ApplicantRepository applicantRepository;
  private final FileService fileService;

  @Transactional
  public ApplicationEvaluationResponse evaluateApplication(
      ApplicationEvaluationRequest body, String adminId) {
    Evaluation evaluation = Evaluation.initialize(body, EvaluationType.APPLICATION, adminId);
    // TODO: 평가자-지원자-타입 쌍 중복 데이터 확인. 있다면 update 처리
    Evaluation savedEvaluation = evaluationRepository.save(evaluation);

    return ApplicationEvaluationResponse.builder()
        .score(savedEvaluation.getScore())
        .comment(savedEvaluation.getComment())
        .build();
  }

  @Transactional
  public InterviewEvaluationResponse evaluateInterview(
      InterviewEvaluationRequest body, String adminId) {
    Evaluation evaluation = Evaluation.initialize(body, EvaluationType.INTERVIEW, adminId);
    // TODO: 평가자-지원자-타입 쌍 중복 데이터 확인. 있다면 update 처리
    Evaluation savedEvaluation = evaluationRepository.save(evaluation);

    return InterviewEvaluationResponse.builder()
        .score(savedEvaluation.getScore())
        .comment(savedEvaluation.getComment())
        .build();
  }

  @Transactional(readOnly = true)
  public EvaluationSearchResponse findAllEvaluations(
      EvaluationSearchRequest body, String currentAdminId, EvaluationType type) {

    int totalEvaluatorCount = clubRoleRepository.countManagerAndMemberByClubId(body.clubId());

    List<Evaluation> evaluations =
        evaluationRepository.findEvaluationsByApplicantIdsAndType(body.applicantIdList(), type);

    // 평가해야 할 인원이 없거나, 평가 데이터가 없는 경우
    if (totalEvaluatorCount == 0 || evaluations.isEmpty())
      return createEmptyEvaluationResponse(body.applicantIdList(), totalEvaluatorCount);

    // 평가자 아이디 - 이름 매핑
    Map<String, String> evaluatorNameMap = getEvaluatorNameMap(evaluations);

    List<String> evaluatorIds = evaluations.stream().map(Evaluation::getEvaluatorId).toList();

    Map<String, FileGetResponse> evaluatorImageMap =
        fileService.findAllByAssociatedIdIn(evaluatorIds).stream()
            .map(
                m ->
                    Map.entry(
                        m.getAssociatedId(),
                        FileGetResponse.of(m, fileService.getPrivateFileGetUrl(m))))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    // applicantId 별로 평가 데이터를 생성
    List<EvaluationSearchResponse.EvaluationsOfApplicant> response =
        evaluations.stream()
            .collect(Collectors.groupingBy(Evaluation::getEvaluateeId))
            .entrySet()
            .stream()
            .map(
                entry ->
                    buildEvaluationsOfApplicant(
                        entry.getKey(),
                        entry.getValue(),
                        evaluatorNameMap,
                        evaluatorImageMap,
                        currentAdminId,
                        totalEvaluatorCount))
            .toList();

    return new EvaluationSearchResponse(response);
  }

  @Transactional(readOnly = true)
  public MyEvaluationStatusSearchResponse findMyEvaluationStatusForApplicants(
      String currentAdminId, String announcementId, EvaluationType type) {

    List<String> applicantIds = applicantRepository.findAllIdByAnnouncementId(announcementId);
    List<String> evaluatedApplicantIds =
        evaluationRepository.findEvaluatedApplicantIds(currentAdminId, type, applicantIds);

    return new MyEvaluationStatusSearchResponse(evaluatedApplicantIds);
  }

  @Transactional(readOnly = true)
  public EvaluationOverviewSearchResponse findAllEvaluationOverviews(
      EvaluationSearchRequest body, EvaluationType type) {
    int totalEvaluatorCount = clubRoleRepository.countManagerAndMemberByClubId(body.clubId());

    List<Evaluation> evaluations =
        evaluationRepository.findEvaluationsByApplicantIdsAndType(body.applicantIdList(), type);

    // 평가해야 할 인원이 없거나, 평가 데이터가 없는 경우
    if (totalEvaluatorCount == 0 || evaluations.isEmpty())
      return createEmptyEvaluationOverviewResponse(body.applicantIdList(), totalEvaluatorCount);

    Map<String, List<Evaluation>> groupedByEvaluateeId =
        evaluations.stream().collect(Collectors.groupingBy(Evaluation::getEvaluateeId));

    List<EvaluationOverviewSearchResponse.OverviewData> overviewDataList =
        groupedByEvaluateeId.entrySet().stream()
            .map(
                entry -> {
                  String applicantId = entry.getKey();

                  List<Evaluation> applicantEvaluations = entry.getValue();
                  int completedEvaluatorCount = applicantEvaluations.size();

                  BigDecimal averageScore =
                      calculateAverageScore(applicantEvaluations, completedEvaluatorCount);

                  return EvaluationOverviewSearchResponse.OverviewData.builder()
                      .applicantId(applicantId)
                      .completedEvaluatorCount(completedEvaluatorCount)
                      .totalEvaluatorCount(totalEvaluatorCount)
                      .averageScore(averageScore)
                      .build();
                })
            .toList();

    return new EvaluationOverviewSearchResponse(overviewDataList);
  }

  @Transactional
  public EvaluationUpdateResponse updateEvaluation(
      EvaluationUpdateRequest body, String evaluationId) {
    // TODO: 본인 평가 ID인지 검증 필요
    Evaluation evaluation = evaluationRepository.findEvaluationById(evaluationId);
    Evaluation updatedEvaluation = evaluation.update(body);
    Evaluation savedEvaluation = evaluationRepository.save(updatedEvaluation);

    return EvaluationUpdateResponse.builder()
        .evaluationId(savedEvaluation.getId())
        .score(savedEvaluation.getScore())
        .comment(savedEvaluation.getComment())
        .build();
  }

  @Transactional
  public void deleteEvaluation(String evaluationId) {
    // TODO: 본인 평가 ID인지 검증 필요
    evaluationRepository.deleteById(evaluationId);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleApplicantDeletedEvent(ApplicantDeletedEvent event) {
    event.applicantIds().stream()
        .filter(evaluationRepository::existsByApplicantId)
        .forEach(evaluationRepository::deleteAllByApplicantId);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    if (!evaluationRepository.existsByAdminId(event.adminId())) {
      return;
    }
    evaluationRepository.deleteAllByAdminId(event.adminId());
  }

  /**
   * 평가자 ID를 기준으로 평가자 이름을 매핑한 Map을 반환합니다.
   *
   * @param evaluations 평가 데이터 리스트
   * @return evaluatorId -> evaluatorName 매핑 Map
   */
  private Map<String, String> getEvaluatorNameMap(List<Evaluation> evaluations) {
    // evaluatorId 수집 (중복 evaluatorId 제거)
    Set<String> evaluatorIds =
        evaluations.stream().map(Evaluation::getEvaluatorId).collect(Collectors.toSet());

    // Admin 이름 매핑 조회
    return adminRepository.findAdminNamesByIds(evaluatorIds.stream().toList());
  }

  /**
   * 지원자 1명에 대한 평가 요약 및 상세 정보를 생성합니다.
   *
   * @param evaluations 평가 데이터 리스트
   * @param evaluatorNameMap evaluatorId → evaluatorName 매핑 Map
   * @param currentAdminId 현재 로그인한 동아리원(평가자) ID
   * @param totalEvaluatorCount 해당 동아리의 전체 평가자 수
   * @return ApplicantEvaluations DTO
   */
  private EvaluationSearchResponse.EvaluationsOfApplicant buildEvaluationsOfApplicant(
      String applicantId,
      List<Evaluation> evaluations,
      Map<String, String> evaluatorNameMap,
      Map<String, FileGetResponse> evaluatorThumbnailMap,
      String currentAdminId,
      int totalEvaluatorCount) {

    int completedEvaluatorCount = evaluations.size();
    BigDecimal averageScore = calculateAverageScore(evaluations, completedEvaluatorCount);

    List<EvaluationSearchResponse.EvaluationDetail> evaluationDetails =
        evaluations.stream()
            .map(
                evaluation ->
                    EvaluationSearchResponse.EvaluationDetail.builder()
                        .evaluationId(evaluation.getId())
                        .evaluatorId(evaluation.getEvaluatorId())
                        .evaluatorName(
                            evaluatorNameMap.getOrDefault(evaluation.getEvaluatorId(), "알수없음"))
                        .evaluatorRepresentativeImage(
                            evaluatorThumbnailMap.getOrDefault(evaluation.getEvaluatorId(), null))
                        .isEvaluatorImagePresent(
                            evaluatorThumbnailMap.containsKey(evaluation.getEvaluatorId()))
                        .score(evaluation.getScore())
                        .comment(evaluation.getComment())
                        .evaluationType(evaluation.getType().name())
                        .isMyEvaluation(evaluation.getEvaluatorId().equals(currentAdminId))
                        .build())
            .toList();

    return EvaluationSearchResponse.EvaluationsOfApplicant.builder()
        .applicantId(applicantId)
        .completedEvaluatorCount(completedEvaluatorCount)
        .totalEvaluatorCount(totalEvaluatorCount)
        .averageScore(averageScore)
        .evaluationDetails(evaluationDetails)
        .build();
  }

  /**
   * 평가 점수의 평균을 계산합니다.
   *
   * @param evaluations 평가 데이터 리스트
   * @param completedEvaluatorCount 평가를 완료한 평가자 수
   * @return 평균 점수 (소수 첫째 자리까지 반올림). 평가가 없으면 0 반환.
   */
  private BigDecimal calculateAverageScore(
      List<Evaluation> evaluations, int completedEvaluatorCount) {
    if (completedEvaluatorCount == 0) {
      return BigDecimal.ZERO;
    }
    return evaluations.stream()
        .map(Evaluation::getScore)
        .reduce(BigDecimal.ZERO, BigDecimal::add)
        .divide(BigDecimal.valueOf(completedEvaluatorCount), 1, RoundingMode.HALF_UP);
  }

  /**
   * 평가 데이터가 존재하지 않는 경우에 대한 평가 데이터 응답 객체를 생성합니다. 각 applicantId 별로 평가자 수, 평균 점수 등을 기본 값으로 채운 응답을
   * 반환합니다.
   *
   * <p>이 메서드는 아래 두 경우에 사용됩니다: - 평가 필수 참여 동아리원이 0명인 경우 (즉, 동아리원이 없는 경우) - 평가 데이터가 없는 경우
   *
   * @param applicantIds 평가 데이터를 생성할 지원자 ID 목록
   * @param totalEvaluatorCount 해당 동아리의 전체 평가자 수 (없으면 0)
   * @return 비어 있는 평가 응답 DTO
   */
  private EvaluationSearchResponse createEmptyEvaluationResponse(
      List<String> applicantIds, int totalEvaluatorCount) {
    final int completedEvaluatorCount = 0;
    final BigDecimal averageScore = BigDecimal.ZERO;

    List<EvaluationSearchResponse.EvaluationsOfApplicant> response =
        applicantIds.stream()
            .map(
                applicantId ->
                    EvaluationSearchResponse.EvaluationsOfApplicant.builder()
                        .applicantId(applicantId)
                        .completedEvaluatorCount(completedEvaluatorCount)
                        .totalEvaluatorCount(totalEvaluatorCount)
                        .averageScore(averageScore)
                        .evaluationDetails(List.of())
                        .build())
            .toList();

    return new EvaluationSearchResponse(response);
  }

  /**
   * 평가 데이터가 존재하지 않는 경우에 대한 평가 요약 응답 객체를 생성합니다. 각 applicantId 별로 평가자 수, 평균 점수 등을 기본 값으로 채운 응답을
   * 반환합니다.
   *
   * <p>이 메서드는 아래 두 경우에 사용됩니다: - 평가 필수 참여 동아리원이 0명인 경우 (즉, 동아리원이 없는 경우) - 평가 데이터가 없는 경우
   *
   * @param applicantIds 평가 데이터를 생성할 지원자 ID 목록
   * @param totalEvaluatorCount 해당 동아리의 전체 평가자 수 (없으면 0)
   * @return 비어 있는 평가 요약 응답 DTO
   */
  private EvaluationOverviewSearchResponse createEmptyEvaluationOverviewResponse(
      List<String> applicantIds, int totalEvaluatorCount) {
    final int completedEvaluatorCount = 0;
    final BigDecimal averageScore = BigDecimal.ZERO;

    List<EvaluationOverviewSearchResponse.OverviewData> overviewDataList =
        applicantIds.stream()
            .map(
                applicantId ->
                    EvaluationOverviewSearchResponse.OverviewData.builder()
                        .applicantId(applicantId)
                        .completedEvaluatorCount(completedEvaluatorCount)
                        .totalEvaluatorCount(totalEvaluatorCount)
                        .averageScore(averageScore)
                        .build())
            .toList();

    return new EvaluationOverviewSearchResponse(overviewDataList);
  }
}
