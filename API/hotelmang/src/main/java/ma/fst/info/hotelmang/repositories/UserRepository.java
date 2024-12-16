package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}