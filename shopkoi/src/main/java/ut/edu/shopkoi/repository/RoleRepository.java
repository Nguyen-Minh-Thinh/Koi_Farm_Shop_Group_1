package ut.edu.shopkoi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.shopkoi.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}