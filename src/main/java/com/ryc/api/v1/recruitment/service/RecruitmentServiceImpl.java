package com.ryc.api.v1.recruitment.service;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.repository.ClubRepository;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.dto.request.CreateRecruitmentRequest;
import com.ryc.api.v1.recruitment.dto.response.CreateRecruitmentResponse;
import com.ryc.api.v1.recruitment.repository.RecruitmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecruitmentServiceImpl implements RecruitmentService {

    private final ClubRepository clubRepository;
    private final RecruitmentRepository recruitmentRepository;

    @Override
    @Transactional
    public CreateRecruitmentResponse createRecruitment(CreateRecruitmentRequest body) {
        Club club = clubRepository.findById(body.clubId())
                .orElseThrow(() -> new NoSuchElementException("Club not found"));

        Recruitment recruitment = body.toRecruitment(club);
        recruitmentRepository.save(recruitment);
        return new CreateRecruitmentResponse(recruitment.getCreatedAt());
    }
}
