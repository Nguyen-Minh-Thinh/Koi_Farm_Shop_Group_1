package com.example.back_end.repository;

import com.example.back_end.modal.TinhTrangDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TinhTrangDonHangRepository extends JpaRepository<TinhTrangDonHang, Integer> {
    // Adjust method name to match the entity field
    //List<TinhTrangDonHang> findByOrder_OrderId(Integer orderId);
}
