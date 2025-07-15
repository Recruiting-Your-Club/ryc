package com.ryc.api.v2.evaluation.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.domain.EvaluationRepository;
import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.presentation.dto.request.ApplicationEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.EvaluationSearchRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.InterviewEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.response.ApplicationEvaluationResponse;
import com.ryc.api.v2.evaluation.presentation.dto.response.EvaluationSearchResponse;
import com.ryc.api.v2.evaluation.presentation.dto.response.InterviewEvaluationResponse;
import com.ryc.api.v2.role.domain.ClubRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationService {
  private final EvaluationRepository evaluationRepository;
  private final AdminRepository adminRepository;
  private final ClubRoleRepository clubRoleRepository;

  @Transactional
  public ApplicationEvaluationResponse evaluateApplication(
      ApplicationEvaluationRequest body, String adminId) {
    Evaluation evaluation = Evaluation.initialize(body, EvaluationType.APPLICATION, adminId);
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

    Map<String, String> evaluatorIdToNameMap = getEvaluatorIdToNameMap(evaluations);

    // applicantId 별로 평가 데이터를 생성
    Map<String, EvaluationSearchResponse.ApplicantEvaluations> response =
        evaluations.stream()
            .collect(
                Collectors.groupingBy(
                    Evaluation::getEvaluateeId,
                    Collectors.collectingAndThen(
                        Collectors.toList(),
                        list ->
                            buildApplicantEvaluations(
                                list, evaluatorIdToNameMap, currentAdminId, totalEvaluatorCount))));

    return new EvaluationSearchResponse(response);
  }

  /**
   * 평가자 ID를 기준으로 평가자 이름을 매핑한 Map을 반환합니다.
   *
   * @param evaluations 평가 데이터 리스트
   * @return evaluatorId -> evaluatorName 매핑 Map
   */
  private Map<String, String> getEvaluatorIdToNameMap(List<Evaluation> evaluations) {
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
   * @param evaluatorIdToNameMap evaluatorId → evaluatorName 매핑 Map
   * @param currentAdminId 현재 로그인한 동아리원(평가자) ID
   * @param totalEvaluatorCount 해당 동아리의 전체 평가자 수
   * @return ApplicantEvaluations DTO
   */
  private EvaluationSearchResponse.ApplicantEvaluations buildApplicantEvaluations(
      List<Evaluation> evaluations,
      Map<String, String> evaluatorIdToNameMap,
      String currentAdminId,
      int totalEvaluatorCount) {

    int completedEvaluatorCount = evaluations.size();
    BigDecimal averageScore = calculateAverageScore(evaluations, completedEvaluatorCount);

    List<EvaluationSearchResponse.EvaluationData> evaluationDatas =
        evaluations.stream()
            .map(
                evaluation ->
                    EvaluationSearchResponse.EvaluationData.builder()
                        .evaluatorId(evaluation.getEvaluatorId())
                        .evaluatorName(
                            evaluatorIdToNameMap.getOrDefault(evaluation.getEvaluatorId(), "알수없음"))
                        .score(evaluation.getScore())
                        .comment(evaluation.getComment())
                        .evaluationType(evaluation.getType().name())
                        .isMyEvaluation(evaluation.getEvaluatorId().equals(currentAdminId))
                        .build())
            .toList();

    return EvaluationSearchResponse.ApplicantEvaluations.builder()
        .completedEvaluatorCount(completedEvaluatorCount)
        .totalEvaluatorCount(totalEvaluatorCount)
        .averageScore(averageScore)
        .evaluationDatas(evaluationDatas)
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
   * 평가 데이터가 존재하지 않는 경우에 대한 응답 객체를 생성합니다. 각 applicantId 별로 평가자 수, 평균 점수 등을 기본 값으로 채운 응답을 반환합니다.
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

    Map<String, EvaluationSearchResponse.ApplicantEvaluations> response = new HashMap<>();
    for (String applicantId : applicantIds) {
      response.put(
          applicantId,
          EvaluationSearchResponse.ApplicantEvaluations.builder()
              .completedEvaluatorCount(completedEvaluatorCount)
              .totalEvaluatorCount(totalEvaluatorCount)
              .averageScore(averageScore)
              .evaluationDatas(List.of())
              .build());
    }

    return new EvaluationSearchResponse(response);
  }
}
