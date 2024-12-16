
package ma.fst.info.hotelmang.repositories;

import ma.fst.info.hotelmang.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
