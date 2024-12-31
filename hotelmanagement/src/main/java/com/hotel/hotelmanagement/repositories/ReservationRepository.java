package com.hotel.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.Reservation;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {


    List<Reservation> findByUserId(int userId);

    Reservation deleteById(int reservationId);
    
}