package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.Room;

import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(int id);
    Room saveRoom(Room room);
    void deleteRoom(int id);
}