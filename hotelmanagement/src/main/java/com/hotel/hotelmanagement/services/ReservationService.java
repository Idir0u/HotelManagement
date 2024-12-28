package com.hotel.hotelmanagement.services;

import java.util.List;

import com.hotel.hotelmanagement.entities.Reservation;

public interface ReservationService {
    List<Reservation> getAllReservations();
    Reservation getReservationById(int id);
    Reservation getReservationByUserId(int userId);
    Reservation saveReservation(Reservation reservation);
    void deleteReservation(int id);
}