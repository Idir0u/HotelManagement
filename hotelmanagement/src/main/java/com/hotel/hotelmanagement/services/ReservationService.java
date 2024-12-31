package com.hotel.hotelmanagement.services;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;

public interface ReservationService {

    Reservation createReservation(ReservationRequest reservationRequest);
    Page<Reservation> getAllReservations(Pageable pageable);
    Reservation getReservationById(int id);
    Reservation saveReservation(Reservation reservation);
    void deleteReservation(int id);
}
