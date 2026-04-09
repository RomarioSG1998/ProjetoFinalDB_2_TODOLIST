package com.capstone.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "CATEGORIES")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome da categoria não pode ficar em branco")
    @Size(max = 50, message = "O nome deve ter no máximo 50 caracteres")
    @Column(length = 50, nullable = false)
    private String name;

    @NotBlank(message = "O código de cor não pode ficar em branco")
    @Size(max = 7, message = "O código de cor deve ter no máximo 7 caracteres (ex: #FFFFFF)")
    @Column(name = "color_code", length = 7, nullable = false)
    private String colorCode;

    // Relacionamento com o Usuário dono da categoria
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    public Category() {
    }

    public Category(String name, String colorCode, User user) {
        this.name = name;
        this.colorCode = colorCode;
        this.user = user;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
