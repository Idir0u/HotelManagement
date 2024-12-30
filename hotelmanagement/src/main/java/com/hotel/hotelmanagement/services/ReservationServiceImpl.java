package com.hotel.hotelmanagement.services;

import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.repositories.RoomRepository;
import com.hotel.hotelmanagement.repositories.UserRepository;
import com.hotel.hotelmanagement.repositories.ReservationRepository; // Add this import
import com.hotel.hotelmanagement.dto.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository; // Add this line to inject the repository

    @Override
    public Reservation createReservation(ReservationRequest reservationRequest) {
        Optional<Room> room = roomRepository.findById(reservationRequest.getRoomId());
        Optional<UserEntity> user = userRepository.findById(reservationRequest.getUserId());

        if (!room.isPresent()) {
            throw new RuntimeException("Room not found");
        }

        Reservation reservation = new Reservation();
        reservation.setRoom(room.get());
        reservation.setStartDate(reservationRequest.getStartDate());
        reservation.setEndDate(reservationRequest.getEndDate());
        reservation.setTotalAmount(reservationRequest.getTotalAmount());

        // Make sure user is set if the user exists
        if (user.isPresent()) {
            reservation.setUser(user.get());
        } else {
            reservation.setUser(null); // set user to null if not logged in
        }

        return reservationRepository.save(reservation);
    }
    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    
    
    


    @Override
    public Reservation getReservationById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getReservationById'");
    }

    @Override
    public Reservation getReservationByUserId(int userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getReservationByUserId'");
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveReservation'");
    }

    @Override
    public void deleteReservation(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteReservation'");
    }
}
