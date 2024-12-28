package com.hotel.hotelmanagement.controllers;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.dto.LoginRequest;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.services.UserServiceImpl;

import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/signup")
    public String signup(@RequestBody UserEntity user) {
        try {
            userService.saveUser(user);
            return "User registered successfully!";
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<UserEntity> user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (user.isPresent()) {
            // Ajouter l'utilisateur à la session
            session.setAttribute("user", user.get());

            // Retourner un objet JSON avec les informations utilisateur
            return ResponseEntity.ok(user.get());
        } else {
            // Retourner une erreur avec un message JSON
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out successfully!";
    }
}