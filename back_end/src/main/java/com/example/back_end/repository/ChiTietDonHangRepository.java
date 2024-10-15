package com.example.back_end.repository;

import com.example.back_end.modal.Chitietdonhang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface ChiTietDonHangRepository extends JpaRepository<Chitietdonhang, Integer> {
    //List<Chitietdonhang> findByOrder_OrderId(Integer orderId);
}