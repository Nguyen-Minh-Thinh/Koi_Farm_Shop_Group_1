package com.example.back_end.controller;

import com.example.back_end.modal.TaiKhoanCuaQuanLy;
import com.example.back_end.service.TaiKhoanCuaQuanLyService;
import com.example.back_end.service.TaiKhoanCuaQuanLyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;

@RestController
public class TaiKhoanCuaQuanLyController {

    @Autowired
    private TaiKhoanCuaQuanLyServiceImpl taiKhoanCuaQuanLyServiceImpl;

    @CrossOrigin(origins = "*") // Co the duoc truy cap tu cac nguon cua frontend
    @PostMapping("/admin/login")
    public TaiKhoanCuaQuanLy login(@RequestBody HashMap<String, String> map) {
        String userName = map.get("userName");
        String password = map.get("passWord");

        TaiKhoanCuaQuanLy account = taiKhoanCuaQuanLyServiceImpl.xacThucDangNhap(userName, password);

        if (account != null) {
            return account; // Đăng nhập thành công
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }

    @CrossOrigin(origins = "*") // Cho phép truy cập từ bất kỳ nguồn nào
    @GetMapping("/api/quanly/taikhoan/{userName}")
    public ResponseEntity<TaiKhoanCuaQuanLy> getAccountByUsername(@PathVariable String userName) {
        Optional<TaiKhoanCuaQuanLy> account = taiKhoanCuaQuanLyServiceImpl.findById(userName);
        return account.map(taikhoan -> new ResponseEntity<>(taikhoan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}