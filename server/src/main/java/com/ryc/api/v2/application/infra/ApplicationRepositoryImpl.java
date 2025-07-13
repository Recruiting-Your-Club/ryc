package com.ryc.api.v2.application.infra;

import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.infra.jpa.ApplicationJpaRepository;
import com.ryc.api.v2.application.infra.mapper.ApplicationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ApplicationRepositoryImpl implements ApplicationRepository {

    private final ApplicationJpaRepository applicationJpaRepository;

    @Override
    public Application save(Application application) {
        return ApplicationMapper.toDomain(applicationJpaRepository.save(ApplicationMapper.toEntity(application)));
    }

    @Override
    public Application findByApplicantId(String applicantId) {
        return applicationJpaRepository.findByApplicantId(applicantId)
                .map(ApplicationMapper::toDomain)
                .orElse(null);
    }
}
