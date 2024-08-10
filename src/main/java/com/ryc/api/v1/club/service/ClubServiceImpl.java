package com.ryc.api.v1.club.service;

import com.ryc.api.v1.club.domain.Category;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.club.domain.ClubCategory;
import com.ryc.api.v1.club.domain.ClubCategoryId;
import com.ryc.api.v1.club.dto.CreateClubRequestDto;
import com.ryc.api.v1.club.dto.CreateClubResponseDto;
import com.ryc.api.v1.club.repository.CategoryRepository;
import com.ryc.api.v1.club.repository.ClubCategoryRepository;
import com.ryc.api.v1.club.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final CategoryRepository categoryRepository;
    private final ClubCategoryRepository clubCategoryRepository;

    @Override
    @Transactional
    public CreateClubResponseDto createClub(CreateClubRequestDto body) {

        if(clubRepository.existsByClubName(body.name())){
            throw new DuplicateKeyException("This club Already Exist");
        }

        Club club = body.toClub();
        clubRepository.save(club);

        //카테고리가 기존에 없을 때, Category 새로 생성
        if (!categoryRepository.existsByName(body.category())) {
            Category category = Category.builder()
                    .name(body.category())
                    .build();
            categoryRepository.save(category);
        }

        Category category = categoryRepository.findByName(body.category());
        ClubCategoryId clubCategoryId = new ClubCategoryId(club.getId(), category.getId());
        ClubCategory clubCategory = ClubCategory.builder()
                .id(clubCategoryId)
                .club(club)
                .category(category)
                .build();

        clubCategoryRepository.save(clubCategory);
        return new CreateClubResponseDto(club.getCreatedAt());
    }
}
