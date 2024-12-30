package com.hotel.hotelmanagement.services;

import java.time.LocalDate;
import java.util.List;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;

public interface ReservationService {

    Reservation createReservation(ReservationRequest reservationRequest);
    List<LocalDate> getOccupiedDates(int roomId, LocalDate startDate, LocalDate endDate);
    List<Reservation> getAllReservations();
    Reservation getReservationById(int id);
    Reservation getReservationByUserId(int userId);
    Reservation saveReservation(Reservation reservation);
    void deleteReservation(int id);
}
