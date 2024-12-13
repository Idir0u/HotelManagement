package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
}