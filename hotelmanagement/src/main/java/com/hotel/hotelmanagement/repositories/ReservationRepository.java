package com.hotel.hotelmanagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.UserEntity;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    //Reservation findByUserId(int userId);
    
    List<Reservation> findByUserId(int userId);
    Reservation deleteById(int reservationId);
}