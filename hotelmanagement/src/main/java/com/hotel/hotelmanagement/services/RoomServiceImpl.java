package com.hotel.hotelmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(int id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(int id) {
        roomRepository.deleteById(id);
    }
}
