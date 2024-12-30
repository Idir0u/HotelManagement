package com.hotel.hotelmanagement.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity saveUser(UserEntity user) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        return userRepository.save(user);
    }

    @Override
    public UserEntity getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Optional<UserEntity> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }


    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public Page<UserEntity> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<UserEntity> getClients(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    
    // Requête pour récupérer les utilisateurs avec le rôle 'client'
    return userRepository.findByRole("client", pageable);
    }


    
}