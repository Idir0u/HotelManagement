package com.hotel.hotelmanagement.dto;

import java.time.LocalDate;

public class UpdateReservationRequest {
    private LocalDate startDate;
    private LocalDate endDate;

    // Getters et Setters
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}

