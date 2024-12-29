package com.hotel.hotelmanagement.dto;


import java.time.LocalDate;
import java.util.Date;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ReservationRequest {

    
    private int roomId;

    
    private float totalAmount;

    private Integer userId;

    
    private LocalDate startDate;

    
    private LocalDate endDate;

}

