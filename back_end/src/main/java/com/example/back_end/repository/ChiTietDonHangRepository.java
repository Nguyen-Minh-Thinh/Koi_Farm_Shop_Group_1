package com.example.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChiTietDonHangRepository extends JpaRepository<Chitietdonhang, Integer> {
    //List<Chitietdonhang> findByOrder_OrderId(Integer orderId);
}