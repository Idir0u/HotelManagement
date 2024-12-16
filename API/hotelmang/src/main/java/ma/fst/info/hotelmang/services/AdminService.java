package ma.fst.info.hotelmang.services;

import ma.fst.info.hotelmang.entities.Admin;

import java.util.List;

public interface AdminService {
    List<Admin> getAllAdmins();
    Admin getAdminById(int id);
    Admin saveAdmin(Admin admin);
    void deleteAdmin(int id);
}
