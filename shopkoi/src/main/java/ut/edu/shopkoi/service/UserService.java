package ut.edu.shopkoi.service;

import ut.edu.shopkoi.dto.UserDto;
import ut.edu.shopkoi.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();
}