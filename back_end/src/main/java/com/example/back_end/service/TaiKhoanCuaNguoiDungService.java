package com.example.back_end.service;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;

import java.util.Map;

public interface TaiKhoanCuaNguoiDungService {
    Map<String, String> xacThucDangNhap(String userName, String passWord);
    boolean xacThucDangKyUserName(String userName);
    TaiKhoanCuaNguoiDung xacThucDangKy(TaiKhoanCuaNguoiDung taiKhoanCuaNguoiDung);
    boolean xacThucEmail(String userName, String email);
}
