package com.example.novelstore.service;

import com.example.novelstore.entity.Novel;
import com.example.novelstore.model.NovelDTO;
import com.example.novelstore.repository.NovelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true) // Optimizes performance for read-only operations
public class NovelService {

    private final NovelRepository novelRepository;

    public NovelService(NovelRepository novelRepository) {
        this.novelRepository = novelRepository;
    }

    /**
     * ✅ Paginated novels (The primary method for the Home page)
     * Maps the database Page of Entities into a Page of DTOs for the frontend.
     */
    public Page<NovelDTO> getNovels(Pageable pageable) {
        return novelRepository.findAll(pageable)
                .map(NovelDTO::fromEntity);
    }

    /**
     * ✅ Single novel by ID
     * Returns null if not found (The Controller will then handle the 404 status).
     */
    public NovelDTO getNovelById(Long id) {
        return novelRepository.findById(id)
                .map(NovelDTO::fromEntity)
                .orElse(null);
    }

    /**
     * ✅ Search Novels by Title
     * This matches the search endpoint we added to your Controller.
     */
    public List<NovelDTO> searchByTitle(String title) {
        // We use 'ContainingIgnoreCase' so "GATSBY" matches "gatsby"
        return novelRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(NovelDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * ✅ Get All Novels (Legacy/Admin Use)
     */
    public List<NovelDTO> getAllNovels() {
        return novelRepository.findAll()
                .stream()
                .map(NovelDTO::fromEntity)
                .toList();
    }
}