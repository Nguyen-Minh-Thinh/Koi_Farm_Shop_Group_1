package com.example.back_end.service;

import com.example.back_end.modal.GioHang;
import com.example.back_end.modal.GioHangDTO;

import java.util.List;
import java.util.Optional;

public interface GioHangService {
    // Tìm các giỏ hàng dựa trên tên tài khoản người dùng (userName)
    List<GioHangDTO> getGioHangByUserName(String userName);
    void deleteGioHang(String userName);
}
