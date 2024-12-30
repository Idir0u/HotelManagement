package com.hotel.hotelmanagement.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    Page<UserEntity> findByRole(String role, Pageable pageable);
}
