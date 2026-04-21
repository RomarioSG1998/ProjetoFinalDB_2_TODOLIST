package com.capstone;

import com.capstone.model.User;
import com.capstone.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsById(1L)) {
            System.out.println("Usuário ID 1 não encontrado. Criando usuário padrão...");
            User defaultUser = new User();
            defaultUser.setUsername("admin");
            defaultUser.setEmail("admin@admin.com");
            defaultUser.setPasswordHash("admin123");
            
            userRepository.save(defaultUser);
            System.out.println("Usuário padrão criado com sucesso!");
        }
    }
}
