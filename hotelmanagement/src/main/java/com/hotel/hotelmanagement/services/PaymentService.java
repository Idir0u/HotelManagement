package com.hotel.hotelmanagement.services;

import java.util.List;

import com.hotel.hotelmanagement.entities.Payment;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment getPaymentById(int id);
    Payment savePayment(Payment payment);
    void deletePayment(int id);
}
