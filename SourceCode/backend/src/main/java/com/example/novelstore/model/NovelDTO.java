package com.example.novelstore.model;

import com.example.novelstore.entity.Novel;

/**
 * Data Transfer Object (DTO) for Novels.
 * This class defines the JSON structure sent to the React frontend.
 */
public class NovelDTO {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Double price;
    private String coverUrl;
    private Boolean featured;
    private Integer publishedYear;
    private String details;

    // Default Constructor
    public NovelDTO() {}

    /**
     * ✅ Static converter: Entity -> DTO
     * Bridges the gap between PostgreSQL (Entity) and the Browser (DTO).
     */
    public static NovelDTO fromEntity(Novel novel) {
        if (novel == null) return null;

        NovelDTO dto = new NovelDTO();
        dto.setId(novel.getId());
        dto.setTitle(novel.getTitle());
        dto.setAuthor(novel.getAuthor());
        dto.setDescription(novel.getDescription());
        dto.setPrice(novel.getPrice());
        dto.setCoverUrl(novel.getCoverUrl());
        dto.setFeatured(novel.getFeatured());
        dto.setPublishedYear(novel.getPublishedYear());
        dto.setDetails(novel.getDetails());
        return dto;
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Integer getPublishedYear() { return publishedYear; }
    public void setPublishedYear(Integer publishedYear) { this.publishedYear = publishedYear; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}