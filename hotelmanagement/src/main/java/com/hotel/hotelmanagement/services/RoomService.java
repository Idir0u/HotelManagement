package com.hotel.hotelmanagement.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

import com.hotel.hotelmanagement.entities.Room;


public interface RoomService {
        Page<Room> getAllRooms(Pageable pageable);
        Page<Room> getRooms(Integer priceMin, Integer priceMax, String type, Integer capacity, int page, int size);
        Room getRoomById(int id);
        Room saveRoom(Room room);
        void deleteRoom(int id);
}