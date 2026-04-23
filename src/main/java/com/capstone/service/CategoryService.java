package com.capstone.service;

import com.capstone.model.Category;
import com.capstone.repository.CategoryRepository;
import com.capstone.validation.CategoryValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;
    private final CategoryValidator categoryValidator;

    public CategoryService(CategoryRepository categoryRepository, CategoryValidator categoryValidator) {
        this.categoryRepository = categoryRepository;
        this.categoryValidator = categoryValidator;
    }

    public Category save(Category category) {
        categoryValidator.validateForSave(category);
        return categoryRepository.save(category);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public List<Category> findByUserId(Long userId) {
        return categoryRepository.findByUserId(userId);
    }

    public Category update(Long id, Category categoryDetails) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(categoryDetails.getName());
            category.setColorCode(categoryDetails.getColorCode());
            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Categoria não encontrada com o id: " + id));
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }
}
