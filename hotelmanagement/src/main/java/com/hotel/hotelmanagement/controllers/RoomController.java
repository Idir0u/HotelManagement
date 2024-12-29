package com.hotel.hotelmanagement.controllers;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.services.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomService roomService;

    

    @GetMapping("/rooms")
    public Page<Room> getRooms(@RequestParam(value = "priceMin", required = false) Integer priceMin,
                               @RequestParam(value = "priceMax", required = false) Integer priceMax,
                               @RequestParam(value = "type", required = false) String type,
                               @RequestParam(value = "capacity", required = false) Integer capacity,
                               @RequestParam(value = "page", defaultValue = "0") int page,
                               @RequestParam(value = "size", defaultValue = "10") int size) {
        return roomService.getRooms(priceMin, priceMax, type, capacity, page, size);
    }
    @GetMapping("/allrooms")
    public Page<Room> getAllRooms(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return roomService.getAllRooms(page, size);
    }
    

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable int id) {
        return roomService.getRoomById(id);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable int id, @RequestBody Room room) {
        room.setId(id);
        return roomService.saveRoom(room);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable int id) {
        roomService.deleteRoom(id);
    }
}
