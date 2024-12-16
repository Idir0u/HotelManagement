package ma.fst.info.hotelmang.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int capacity;
    private String description;
    private String type;
    private boolean isOccupied;
    private float adultPrice;
    private float childPrice;

    @OneToMany(mappedBy = "room")
    private List<Reservation> reservations;
} 
