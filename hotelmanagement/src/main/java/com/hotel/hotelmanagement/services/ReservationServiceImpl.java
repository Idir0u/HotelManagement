package com.hotel.hotelmanagement.services;

import com.hotel.hotelmanagement.entities.Reservation;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.entities.UserEntity;
import com.hotel.hotelmanagement.repositories.RoomRepository;
import com.hotel.hotelmanagement.repositories.UserRepository;
import com.hotel.hotelmanagement.repositories.ReservationRepository;
import com.hotel.hotelmanagement.dto.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository;

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

        if (user.isPresent()) {
            reservation.setUser(user.get());
        } else {
            reservation.setUser(null);
        }

        return reservationRepository.save(reservation);
    }

    @Override
    public Page<Reservation> getAllReservations(Pageable pageable){
        
        return reservationRepository.findAll(pageable);
    }

    @Override
    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id).orElse(null);
    }
    
   

    @Override
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(int id) {
        reservationRepository.deleteById(id);
    }
}
