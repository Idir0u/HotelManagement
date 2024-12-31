package com.hotel.hotelmanagement.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.dto.ReservationRequest;
import com.hotel.hotelmanagement.dto.UpdateReservationRequest;
import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.services.ReservationService;
import com.hotel.hotelmanagement.repositories.ReservationRepository;
import com.hotel.hotelmanagement.repositories.RoomRepository;

import com.hotel.hotelmanagement.repositories.UserRepository;

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
    public Page<Reservation> getAllReservations(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        System.out.println("I'm in Controller getAllReservations");
        return reservationService.getAllReservations(pageable);//reservationRepository.findAll(pageable);
    }
    //===================================yasser=============================
    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUser(@PathVariable int userId) {
        
        return reservationRepository.findByUserId(userId);
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
            reservation.setUser(user.get());
        } else {
            reservation.setUser(null);
        }

        reservationRepository.save(reservation);

        return ResponseEntity.ok(Map.of("reservationId", reservation.getId()));
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable int id, @RequestBody Reservation reservation) {
        reservation.setId(id);
        return reservationService.saveReservation(reservation);
    }

    //===================================yasser=============================
    
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



    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable int id) {
        reservationService.deleteReservation(id);
    }
}
