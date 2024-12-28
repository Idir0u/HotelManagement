package com.hotel.hotelmanagement.services;
import java.util.List;

import com.hotel.hotelmanagement.entities.UserEntity;


public interface UserService {
    List<UserEntity> getAllUsers();
    UserEntity getUserById(int id);
    UserEntity saveUser(UserEntity user);
    void deleteUser(int id);
}