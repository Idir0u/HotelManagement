package ma.fst.info.hotelmang.services.impl;

import ma.fst.info.hotelmang.entities.Reservation;
import ma.fst.info.hotelmang.repositories.ReservationRepository;
import ma.fst.info.hotelmang.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(int id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public Reservation getReservationByUserId(int userId) {
        return reservationRepository.findByUserId(userId);
    }
}
