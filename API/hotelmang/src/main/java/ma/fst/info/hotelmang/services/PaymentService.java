package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.Payment;

import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment getPaymentById(int id);
    Payment savePayment(Payment payment);
    void deletePayment(int id);
}
