package com.example.back_end.repository;

import com.example.back_end.modal.GioHang;
import com.example.back_end.modal.GioHangDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GioHangRepository extends JpaRepository<GioHang, Integer> {
    // Phương thức tự động do Spring Data JPA tạo dựa trên tên phương thức
    @Query(value = "SELECT a.*, b.name_of_fish, b.image FROM gio_hang a, ca_koi_nhat b WHERE a.id_of_fish = b.id_of_fish and a.tai_khoan_nguoi_dung = :userName", nativeQuery = true)
    List<Object[]> findByTaiKhoanNguoiDung_UserName(@Param("userName") String userName);
}
