package com.hotel.hotelmanagement.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.services.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable int id) {
        return reservationService.getReservationById(id);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        if (reservation.getUser() == null) {
            
        } else {
            System.out.println("Reservation by registered user: " + reservation.getUser().getId());
        }
        return reservationService.saveReservation(reservation);
    }


    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable int id, @RequestBody Reservation reservation) {
        reservation.setId(id);
        return reservationService.saveReservation(reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable int id) {
        reservationService.deleteReservation(id);
    }
}
