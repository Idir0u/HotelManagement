package com.hotel.hotelmanagement.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.dto.UpdateReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.services.ReservationService;
import com.hotel.hotelmanagement.services.ReservationServiceImpl;
import com.hotel.hotelmanagement.repositories.ReservationRepository;
import com.hotel.hotelmanagement.repositories.RoomRepository;

import com.hotel.hotelmanagement.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;

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
    private ReservationServiceImpl reservationServiceImpl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository; 

    @GetMapping("/reservation")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }


    @GetMapping("/reservation/{userId}")
public List<Reservation> getReservationsByUser(@PathVariable int userId) {
    

    return reservationRepository.findByUserId(userId);
}
    @DeleteMapping("/{reservationId}")
    Reservation cancelReservation(@PathVariable int reservationId){
        return reservationRepository.deleteById(reservationId);
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


    


@PutMapping("/update/{reservationId}")
public ResponseEntity<String> updateReservation(
    @PathVariable int reservationId,
    @RequestBody UpdateReservationRequest request
) {
    return reservationRepository.findById(reservationId).map(reservation -> {
        // Mettre à jour les dates
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());

        // Recalcul automatique du montant total
        long numberOfNights = java.time.temporal.ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        float newTotalAmount = numberOfNights * reservation.getRoom().getPrice();
        reservation.setTotalAmount(newTotalAmount);

        // Sauvegarder la réservation mise à jour
        reservationRepository.save(reservation);

        return ResponseEntity.ok("La réservation avec l'ID " + reservationId + " a été mise à jour avec succès.");
    }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("La réservation avec l'ID " + reservationId + " n'existe pas."));
}


}
