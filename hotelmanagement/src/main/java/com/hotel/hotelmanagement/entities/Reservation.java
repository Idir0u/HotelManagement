package com.hotel.hotelmanagement.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id") 
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "room_id") 
    private Room room;

    private Date startDate;

    private Date endDate;
    
    private float totalAmount;
}
