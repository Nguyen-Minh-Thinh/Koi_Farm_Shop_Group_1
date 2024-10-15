package com.example.back_end.service;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;

public interface TaiKhoanCuaNguoiDungService {
    TaiKhoanCuaNguoiDung xacThucDangNhap(String userName, String passWord);
    boolean xacThucDangKyUserName(String userName);
    TaiKhoanCuaNguoiDung xacThucDangKy(TaiKhoanCuaNguoiDung taiKhoanCuaNguoiDung);
    boolean xacThucEmail(String userName, String email);
}
