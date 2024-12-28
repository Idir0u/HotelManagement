package com.hotel.hotelmanagement.services;


import java.util.List;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(int id);
    Room saveRoom(Room room);
    void deleteRoom(int id);
}