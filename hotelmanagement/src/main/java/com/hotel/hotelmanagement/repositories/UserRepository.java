package com.hotel.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}