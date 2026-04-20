package com.capstone.repository;

import com.capstone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO users (username, email, password_hash, created_at) VALUES (:username, :email, crypt(:rawPassword, gen_salt('bf')), CURRENT_TIMESTAMP)", nativeQuery = true)
    void saveUserWithHash(@Param("username") String username, @Param("email") String email, @Param("rawPassword") String rawPassword);
   
    @Query(value = "SELECT * FROM users WHERE email = :email AND password_hash = crypt(:rawPassword, password_hash)", nativeQuery = true)
    Optional<User> loginWithHash(@Param("email") String email, @Param("rawPassword") String rawPassword);
}
