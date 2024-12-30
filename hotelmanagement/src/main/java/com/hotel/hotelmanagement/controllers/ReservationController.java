package com.hotel.hotelmanagement.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.services.ReservationService;
import com.hotel.hotelmanagement.repositories.ReservationRepository;
import com.hotel.hotelmanagement.repositories.RoomRepository;

import com.hotel.hotelmanagement.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository; 

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequest reservationRequest) {
        Optional<Room> room = roomRepository.findById(reservationRequest.getRoomId());
        Optional<UserEntity> user = userRepository.findById(reservationRequest.getUserId());

        if (!room.isPresent()) {
            return ResponseEntity.badRequest().body("Room not found.");
        }

        Reservation reservation = new Reservation();
        reservation.setRoom(room.get());
        reservation.setStartDate(reservationRequest.getStartDate());
        reservation.setEndDate(reservationRequest.getEndDate());
        reservation.setTotalAmount(reservationRequest.getTotalAmount());
        
        if (user.isPresent()) {
            reservation.setUser(user.get());  // Make sure to set the user if found
        } else {
            reservation.setUser(null);  // If the user doesn't exist (null), set it to null
        }

        reservationRepository.save(reservation);  // Save reservation to DB

        return ResponseEntity.ok(Map.of("reservationId", reservation.getId()));
    }
    @GetMapping("/occupied-dates")
    public ResponseEntity<List<LocalDate>> getOccupiedDates(
            @RequestParam int roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<LocalDate> occupiedDates = reservationService.getOccupiedDates(roomId, startDate, endDate);
        return ResponseEntity.ok(occupiedDates);
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
