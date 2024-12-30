package com.hotel.hotelmanagement.services;

import java.util.List;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.UserEntity;

public interface ReservationService {

    Reservation createReservation(ReservationRequest reservationRequest);
    List<Reservation> getAllReservations();
    Reservation getReservationById(int id);
    Reservation getReservationByUserId(int userId);
    Reservation saveReservation(Reservation reservation);
    void deleteReservation(int id);
}
