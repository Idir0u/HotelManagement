package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.Reservation;

import java.util.List;

public interface ReservationService {
    List<Reservation> getAllReservations();
    Reservation getReservationById(int id);
    Reservation getReservationByUserId(int userId);
    Reservation saveReservation(Reservation reservation);
    void deleteReservation(int id);
}