package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllNotifications();
    Notification getNotificationById(int id);
    Notification saveNotification(Notification notification);
    void deleteNotification(int id);
}
