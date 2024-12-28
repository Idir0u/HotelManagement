package com.hotel.hotelmanagement.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.entities.Room;
import com.hotel.hotelmanagement.services.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/rooms")
    public Page<Room> getRooms(
            @RequestParam(defaultValue = "0") int page,  // Default is page 0
            @RequestParam(defaultValue = "10") int size  // Default is 10 rooms per page
    ) {
        return roomService.getAllRooms(page, size); // Fetch paginated rooms from the service
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
