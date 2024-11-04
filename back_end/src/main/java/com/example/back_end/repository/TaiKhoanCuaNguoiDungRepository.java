package com.example.back_end.repository;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface TaiKhoanCuaNguoiDungRepository extends JpaRepository<TaiKhoanCuaNguoiDung, String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE tai_khoan_cua_nguoi_dung SET pass_word = :newPassword WHERE user_name = :username", nativeQuery = true)
    int updatePassword(@Param("username") String username, @Param("newPassword") String newPassword);

}