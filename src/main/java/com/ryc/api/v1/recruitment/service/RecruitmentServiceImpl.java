package com.ryc.api.v1.recruitment.service;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.club.service.ClubService;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.dto.request.CreateRecruitmentRequest;
import com.ryc.api.v1.recruitment.dto.response.CreateRecruitmentResponse;
import com.ryc.api.v1.recruitment.repository.RecruitmentRepository;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RecruitmentServiceImpl implements RecruitmentService {

    private final ClubRepository clubRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final StepRepository stepRepository;

    @Override
    @Transactional
    public CreateRecruitmentResponse createRecruitment(CreateRecruitmentRequest body) {
        // 1. 해당동아리 조회
        Club club = clubRepository.findById(body.clubId())
                .orElseThrow(() -> new NoSuchElementException("Club not found"));

        //2. 모집전형 생성
        Recruitment recruitment = body.toRecruitment(club);
        recruitmentRepository.save(recruitment);

        //3. 모집전형 내부 step 생성
        List<Step> steps = body.toStepList(recruitment);
        stepRepository.saveAll(steps);

        return new CreateRecruitmentResponse(recruitment.getCreatedAt());
    }
}
