package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}