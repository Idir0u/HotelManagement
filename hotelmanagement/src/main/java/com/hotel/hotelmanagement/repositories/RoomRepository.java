package com.hotel.hotelmanagement.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
}