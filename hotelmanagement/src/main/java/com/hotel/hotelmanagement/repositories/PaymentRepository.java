package com.hotel.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.hotelmanagement.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
