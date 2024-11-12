package com.example.back_end.service;


import com.example.back_end.modal.TaiKhoanCuaQuanLy;

import java.util.Optional;

public interface TaiKhoanCuaQuanLyService {
    TaiKhoanCuaQuanLy xacThucDangNhap(String userName, String passWord);
    Optional<TaiKhoanCuaQuanLy> findById(String userName);
}
