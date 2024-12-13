package ma.fst.info.hotelmang.entities;

import jakarta.persistence.*;
import java.util.List;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String phoneNumber;
    private String password;
    private String address;

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;

}
