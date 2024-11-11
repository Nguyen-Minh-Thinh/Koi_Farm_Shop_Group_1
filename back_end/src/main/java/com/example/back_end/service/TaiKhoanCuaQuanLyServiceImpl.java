package com.example.back_end.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.modal.TaiKhoanCuaQuanLy;
import com.example.back_end.repository.TaiKhoanCuaQuanLyRepository;

@Service
public class TaiKhoanCuaQuanLyServiceImpl implements TaiKhoanCuaQuanLyService {

    @Autowired
    private TaiKhoanCuaQuanLyRepository taiKhoanCuaQuanLyRepository;

    @Override
    public TaiKhoanCuaQuanLy xacThucDangNhap(String userName, String passWord) {
        Optional<TaiKhoanCuaQuanLy> accountOptional = taiKhoanCuaQuanLyRepository.findById(userName);
        if (accountOptional.isPresent()) {
            TaiKhoanCuaQuanLy account = accountOptional.get();
            if (account.getPassWord().equals(passWord)) { // Bạn nên mã hóa mật khẩu
                return account;
            }
        }
        return null; // Hoặc ném ngoại lệ tùy theo yêu cầu
    }

    public Optional<TaiKhoanCuaQuanLy> findById(String userName) {
        return taiKhoanCuaQuanLyRepository.findById(userName);
    }
}