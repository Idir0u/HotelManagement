package com.hotel.hotelmanagement.services;


import java.util.List;

import org.springframework.data.domain.Page;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomService {
    Page<Room> getAllRooms(int page, int size);
    Room getRoomById(int id);
    Room saveRoom(Room room);
    void deleteRoom(int id);
}