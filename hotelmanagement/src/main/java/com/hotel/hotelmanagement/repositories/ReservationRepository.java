package com.hotel.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    Reservation findByUserId(int userId);
}