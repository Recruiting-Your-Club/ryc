package com.ryc.api.v2.applicant.infra;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.applicant.infra.mapper.ApplicantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ApplicantRepositoryImpl implements ApplicantRepository {

    private final ApplicantJpaRepository applicantJpaRepository;

    @Override
    public Applicant save(Applicant applicant) {
        return ApplicantMapper.toDomain(applicantJpaRepository.save(ApplicantMapper.toEntity(applicant)));
    }

    @Override
    public Optional<Applicant> findById(String id) {
        return applicantJpaRepository.findById(id).map(ApplicantMapper::toDomain);
    }

    @Override
    public List<Applicant> findAllByAnnouncementId(String announcementId) {
        return applicantJpaRepository.findAllByAnnouncementId(announcementId).stream()
                .map(ApplicantMapper::toDomain)
                .collect(Collectors.toList());
    }
}
