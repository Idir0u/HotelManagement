package com.hotel.hotelmanagement.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hotel.hotelmanagement.entities.Payment;
import com.hotel.hotelmanagement.services.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable int id) {
        return paymentService.getPaymentById(id);
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable int id, @RequestBody Payment payment) {
        payment.setId(id);
        return paymentService.savePayment(payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable int id) {
        paymentService.deletePayment(id);
    }
}
