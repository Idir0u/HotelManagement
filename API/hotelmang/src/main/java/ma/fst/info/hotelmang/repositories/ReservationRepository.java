package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    Reservation findByUserId(int userId);
}