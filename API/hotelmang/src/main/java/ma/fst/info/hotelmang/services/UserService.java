package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(int id);
    User saveUser(User user);
    void deleteUser(int id);
}