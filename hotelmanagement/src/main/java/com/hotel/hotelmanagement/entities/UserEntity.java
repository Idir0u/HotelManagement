package com.hotel.hotelmanagement.entities;

import jakarta.persistence.*;
import java.util.List;
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
    private String UserRole;

    @PrePersist
    public void setDefaultRole() {
        if (this.UserRole == null || this.UserRole.isEmpty()) {
            this.UserRole = "client";
        }
    }

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;

}
