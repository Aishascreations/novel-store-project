package com.example.novelstore.repository;

import com.example.novelstore.entity.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for Novel entities.
 * JpaRepository provides standard CRUD and Pagination out of the box.
 */
@Repository
public interface NovelRepository extends JpaRepository<Novel, Long> {

    /**
     * ✅ SEARCH LOGIC
     * Spring parses this name to create:
     * "SELECT * FROM novels WHERE LOWER(title) LIKE LOWER(CONCAT('%', :title, '%'))"
     */
    List<Novel> findByTitleContainingIgnoreCase(String title);

    /**
     * ✅ FILTER BY FEATURED
     * Useful for a "Featured Books" carousel on your React Home page.
     */
    List<Novel> findByFeaturedTrue();
}