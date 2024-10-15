//package com.example.back_end.service;
//
//import com.example.back_end.exception.ResourceNotFoundException;
//import com.example.back_end.modal.Donhang;
//import com.example.back_end.modal.GioiThieu;
//import com.example.back_end.modal.TinhTrangDonHang;
//import com.example.back_end.repository.DonHangRepository;
//import com.example.back_end.repository.TinhTrangDonHangRepository;
//import com.example.back_end.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class OrderServiceImple implements OrderService {
//
//    @Autowired
//    private DonHangRepository donHangRepository;
//
//    @Autowired
//    private TinhTrangDonHangRepository tinhTrangDonHangRepository;
//
//    @Transactional
////    @Override
////    public TinhTrangDonHang addStatusToOrder(Integer orderId, TinhTrangDonHang status) {
////        Donhang donHang = donHangRepository.findById(orderId)
////                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
////        status.setOrder(donHang);
////        return tinhTrangDonHangRepository.save(status);
////    }
//
//    @Override
//    public List<TinhTrangDonHang> getStatusesForOrder(Integer orderId) {
//        //return tinhTrangDonHangRepository.findByOrder_OrderId(orderId);
//        return null;
//    }
//
//    @Override
//    public ArrayList<Donhang> findAllDonhangs() {
//        return (ArrayList<Donhang>) donHangRepository.findAll();
//    }
//
//
//    @Override
//    public Donhang getOrderById(Integer orderId) {
//        return donHangRepository.findById(orderId)
//                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
//    }
//
//    @Override
//    public TinhTrangDonHang getStatusById(Integer statusId) {
//        return tinhTrangDonHangRepository.findById(statusId)
//                .orElseThrow(() -> new ResourceNotFoundException("Order status not found with ID: " + statusId));
//    }
//}
