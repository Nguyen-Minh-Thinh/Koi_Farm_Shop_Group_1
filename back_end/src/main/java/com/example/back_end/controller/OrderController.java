package com.example.back_end.controller;

import com.example.back_end.repository.DonHangRepository;
import com.example.back_end.repository.TinhTrangDonHangRepository;
import com.example.back_end.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import com.example.back_end.modal.TinhTrangDonHang;
import com.example.back_end.modal.Donhang;
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private TinhTrangDonHangRepository tinhTrangDonHangRepository;

    @Autowired
    private DonHangRepository donhangRepository;

    @CrossOrigin(origins = "*")
    @GetMapping("/{orderId}")
    public ResponseEntity<Donhang> getOrderDetails(@PathVariable Integer orderId) {
        Optional<Donhang> optionalOrder = orderService.getOrderDetails(orderId);
        if (optionalOrder.isPresent()) {
            return ResponseEntity.ok(optionalOrder.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<Donhang>> getAllOrders() {
        List<Donhang> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/status")
    public ResponseEntity<List<TinhTrangDonHang>> getTinhTrangDonHang() {
        List<TinhTrangDonHang> orderss = orderService.getTinhTrangDonHang();
        return ResponseEntity.ok(orderss);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{orderId}/status")
    public ResponseEntity<Set<TinhTrangDonHang>> getOrderStatus(@PathVariable Integer orderId) {
        Optional<Donhang> optionalOrder = orderService.getOrderDetails(orderId);
        if (optionalOrder.isPresent()) {
            Set<TinhTrangDonHang> orderStatuses = optionalOrder.get().getTinhTrangDonHangs();
            return ResponseEntity.ok(orderStatuses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{orderId}/status")
    public ResponseEntity<?> addOrderStatus(@PathVariable Integer orderId, @RequestBody TinhTrangDonHang newStatus) {
        try {
            System.out.println("Adding status for order ID: " + orderId);
            System.out.println("New Status Details: " + newStatus.toString());

            Optional<Donhang> orderOptional = donhangRepository.findById(orderId);
            if (orderOptional.isPresent()) {
                Donhang order = orderOptional.get();
                newStatus.setOrder(order);
                TinhTrangDonHang savedStatus = tinhTrangDonHangRepository.save(newStatus);
                System.out.println("Status saved successfully: " + savedStatus.toString());
                return new ResponseEntity<>(savedStatus, HttpStatus.CREATED);
            } else {
                System.out.println("Order not found for ID: " + orderId);
                return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error saving status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Donhang newOrder) {
        if (newOrder == null) {
            return new ResponseEntity<>("Order data is null", HttpStatus.BAD_REQUEST);
        }

        try {
            // Kiểm tra lại dữ liệu nhận được
            Donhang savedOrder = donhangRepository.save(newOrder);
            System.out.println("Received Order: " + savedOrder); // Kiểm tra nội dung đơn hàng đã lưu

            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            // Trả về thông báo lỗi với thông tin chi tiết
            return new ResponseEntity<>("Error creating order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}