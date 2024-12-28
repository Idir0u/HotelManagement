package com.hotel.hotelmanagement.repositories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Page<Room> findAll(Pageable pageable);
}