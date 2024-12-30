package com.hotel.hotelmanagement.entities;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String phoneNumber;
    private String password;
    private String role;

    @PrePersist
    public void setDefaultRole() {
        if (this.role == null || this.role.isEmpty()) {
            this.role = "client";
        }
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Reservation> reservations;

}
