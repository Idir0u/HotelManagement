package com.hotel.hotelmanagement.services;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomService {
    Page<Room> getRooms(Integer priceMin, Integer priceMax, String type, Integer capacity, int page, int size);
    Page<Room> getAllRooms(Pageable pageable);
    Room getRoomById(int id);
    Room saveRoom(Room room);
    void deleteRoom(int id);
}