package com.capstone.validation;

import com.capstone.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryValidator {

    public void validateForSave(Category category) {
        // Valida se o código de cor está no padrão Hexadecimal correto (#RRGGBB)
        if (category.getColorCode() != null && !category.getColorCode().matches("^#[A-Fa-f0-9]{6}$")) {
            throw new IllegalArgumentException(
                    "O código da cor deve ser um hexadecimal válido com 7 caracteres (exemplo: #FF0000)");
        }
    }
}
