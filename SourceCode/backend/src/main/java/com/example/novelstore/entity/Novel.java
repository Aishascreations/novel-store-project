package com.example.novelstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Represents a Book/Novel in the database.
 * Matches the 'novels' table in SQL.
 */
@Entity
@Table(name = "novels")
public class Novel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @Column(length = 1000) // Allows for longer descriptions
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price cannot be negative")
    private Double price;

    private String coverUrl;

    @Column(columnDefinition = "boolean default false")
    private Boolean featured = false;

    private Integer publishedYear;

    @Column(columnDefinition = "TEXT") // Good for very long HTML or text details
    private String details;

    // Default constructor for JPA
    public Novel() {}

    // --- Getters and Setters ---
    // (Note: In a real project, use the @Data annotation from Lombok to remove these)

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