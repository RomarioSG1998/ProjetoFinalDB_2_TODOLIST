package com.capstone.validation;

import com.capstone.model.User;
import com.capstone.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {

    private final UserRepository userRepository;

    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void validateForSave(User user) {
        if (user.getId() == null && userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("E-mail já está em uso por outro usuário!");
        }
    }
}
