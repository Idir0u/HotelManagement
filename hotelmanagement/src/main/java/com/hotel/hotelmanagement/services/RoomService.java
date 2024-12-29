package com.hotel.hotelmanagement.services;


import java.util.List;

import com.hotel.hotelmanagement.entities.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface RoomService {
    Page<Room> getAllRooms(Pageable pageable);
    Room getRoomById(int id);
    Room saveRoom(Room room);
    void deleteRoom(int id);
}