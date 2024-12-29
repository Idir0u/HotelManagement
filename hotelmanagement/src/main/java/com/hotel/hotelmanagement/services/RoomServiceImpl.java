package com.hotel.hotelmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Page<Room> getAllRooms(Pageable pageable) {
        return roomRepository.findAll(pageable);
    }

    public Page<Room> getRooms(Integer priceMin, Integer priceMax, String type, Integer capacity, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return roomRepository.findRoomsWithFilters(priceMin, priceMax, type, capacity, pageable);
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
