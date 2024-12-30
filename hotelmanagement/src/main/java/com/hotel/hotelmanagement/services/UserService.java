package com.hotel.hotelmanagement.services;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hotel.hotelmanagement.entities.UserEntity;


public interface UserService {
    Page<UserEntity> getUsers(Pageable pageable);
    Page<UserEntity> getClients(int page, int size);
    UserEntity getUserById(int id);
    UserEntity saveUser(UserEntity user);
    void deleteUser(int id);
}


