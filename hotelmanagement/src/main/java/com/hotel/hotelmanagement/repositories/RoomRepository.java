package com.hotel.hotelmanagement.repositories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hotel.hotelmanagement.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("SELECT r FROM Room r WHERE (:priceMin IS NULL OR r.price >= :priceMin) " +
           "AND (:priceMax IS NULL OR r.price <= :priceMax) " +
           "AND (:type IS NULL OR r.type = :type) " +
           "AND (:capacity IS NULL OR r.capacity = :capacity)")
    Page<Room> findRoomsWithFilters(Integer priceMin, Integer priceMax, String type, Integer capacity, Pageable pageable);
}
