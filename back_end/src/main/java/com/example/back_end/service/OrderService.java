package com.example.back_end.service;

import com.example.back_end.modal.Donhang;
import com.example.back_end.modal.TinhTrangDonHang;
import com.example.back_end.repository.DonHangRepository;
import com.example.back_end.repository.TinhTrangDonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
