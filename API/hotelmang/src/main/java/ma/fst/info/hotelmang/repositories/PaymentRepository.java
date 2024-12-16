package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
