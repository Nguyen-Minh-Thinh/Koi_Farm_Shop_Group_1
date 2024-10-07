package ut.edu.shopkoi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.shopkoi.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
