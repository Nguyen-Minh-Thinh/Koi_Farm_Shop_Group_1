package com.example.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TinhTrangDonHangRepository extends JpaRepository<TinhTrangDonHang, Integer> {
    // Adjust method name to match the entity field
    //List<TinhTrangDonHang> findByOrder_OrderId(Integer orderId);
}
