package com.example.novelstore.controller;

import com.example.novelstore.model.NovelDTO;
import com.example.novelstore.service.NovelService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Novel Operations.
 * Root Path: http://localhost:8080/api/novels
 */
@RestController
@RequestMapping("/api/novels")
public class NovelController {

    private final NovelService novelService;

    // Constructor Injection (Best Practice)
    public NovelController(NovelService novelService) {
        this.novelService = novelService;
    }

    /**
     * 1. GET ALL NOVELS (Paginated)
     * Handles: GET /api/novels?page=0&size=10
     * returns 200 OK with Page object
     */
    @GetMapping
    public ResponseEntity<Page<NovelDTO>> getAllNovels(Pageable pageable) {
        Page<NovelDTO> novels = novelService.getNovels(pageable);
        return ResponseEntity.ok(novels);
    }

    /**
     * 2. GET SINGLE NOVEL BY ID
     * Handles: GET /api/novels/5
     * returns 200 OK if found, 404 NOT FOUND if ID does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<NovelDTO> getNovelById(@PathVariable Long id) {
        NovelDTO novel = novelService.getNovelById(id);

        if (novel == null) {
            // This prevents your React app from trying to read 'null'
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(novel);
    }

    /**
     * 3. SEARCH NOVELS BY TITLE
     * Handles: GET /api/novels/search?title=Harry
     * returns 200 OK with list of matching books
     */
    @GetMapping("/search")
    public ResponseEntity<List<NovelDTO>> searchNovels(@RequestParam String title) {
        List<NovelDTO> results = novelService.searchByTitle(title);
        return ResponseEntity.ok(results);
    }
}