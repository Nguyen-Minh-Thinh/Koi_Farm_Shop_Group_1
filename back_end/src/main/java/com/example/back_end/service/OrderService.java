package com.example.back_end.service;

import com.example.back_end.repository.DonHangRepository;
import com.example.back_end.repository.TinhTrangDonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.example.back_end.modal.TinhTrangDonHang;
import com.example.back_end.modal.Donhang;
@Service
public class OrderService {

    @Autowired
    private DonHangRepository donhangRepository;

    @Autowired
    private TinhTrangDonHangRepository tinhTrangDonHangRepository;

    public Optional<Donhang> getOrderDetails(Integer orderId) {
        return donhangRepository.findById(orderId);
    }

    public List<TinhTrangDonHang> getTinhTrangDonHang() {
        return tinhTrangDonHangRepository.findAll();
    }

    public List<Donhang> getAllOrders() {
        return donhangRepository.findAll();
    }


}
