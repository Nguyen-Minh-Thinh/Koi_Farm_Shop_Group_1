package com.example.back_end.controller;

import com.example.back_end.modal.KhuyenMai;
import com.example.back_end.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/khuyenmai")

public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<KhuyenMai>> getAllKhuyenMai() {
        List<KhuyenMai> khuyenMaiList = khuyenMaiService.getAllKhuyenMai();
        return new ResponseEntity<>(khuyenMaiList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<KhuyenMai> getKhuyenMaiById(@PathVariable Integer id) {
        Optional<KhuyenMai> khuyenMaiOptional = khuyenMaiService.getKhuyenMaiById(id);
        return khuyenMaiOptional.map(khuyenMai -> new ResponseEntity<>(khuyenMai, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<KhuyenMai> addKhuyenMai(@RequestBody KhuyenMai khuyenMai) {
        if (khuyenMai == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            KhuyenMai createdKhuyenMai = khuyenMaiService.addKhuyenMai(khuyenMai);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdKhuyenMai);
        } catch (Exception e) {
            // Log the error
            e.printStackTrace(); // Hoặc sử dụng một logger để ghi lại thông tin
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public ResponseEntity<KhuyenMai> updateKhuyenMai(@PathVariable Integer id, @RequestBody KhuyenMai updatedKhuyenMai) {
        try {
            KhuyenMai khuyenMai = khuyenMaiService.updateKhuyenMai(id, updatedKhuyenMai);
            return ResponseEntity.ok(khuyenMai);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKhuyenMai(@PathVariable Integer id) {
        try {
            khuyenMaiService.deleteKhuyenMai(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
