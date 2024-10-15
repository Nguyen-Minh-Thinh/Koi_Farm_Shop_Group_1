package com.example.back_end.service;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;
import com.example.back_end.repository.TaiKhoanCuaNguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaiKhoanCuaNguoiDungServiceImple implements TaiKhoanCuaNguoiDungService {

    @Autowired
    private TaiKhoanCuaNguoiDungRepository taiKhoanCuaNguoiDungRepository;

    @Override
    public TaiKhoanCuaNguoiDung xacThucDangNhap(String userName, String password) {
        Optional<TaiKhoanCuaNguoiDung> accountOptional = taiKhoanCuaNguoiDungRepository.findById(userName);
        if (accountOptional.isPresent()) {
            TaiKhoanCuaNguoiDung account = accountOptional.get();
            if (account.getPassWord().equals(password)) {
                return account;
            }
        }
        return null; // Hoặc ném ngoại lệ tùy theo yêu cầu
    }

    @Override
    public boolean xacThucDangKyUserName(String userName){
        Optional<TaiKhoanCuaNguoiDung> accountOptional = taiKhoanCuaNguoiDungRepository.findById(userName);
        if (accountOptional.isPresent()) {
            return false;
        }
        return true;
    }

    @Override
    public TaiKhoanCuaNguoiDung xacThucDangKy(TaiKhoanCuaNguoiDung taiKhoanCuaNguoiDung) {
        // Kiểm tra xem tên đăng nhập đã tồn tại chưa
        String userName = taiKhoanCuaNguoiDung.getUserName();
        Optional<TaiKhoanCuaNguoiDung> existingAccount = taiKhoanCuaNguoiDungRepository.findById(userName);

        // Nếu tên đăng nhập chưa tồn tại, lưu tài khoản vào cơ sở dữ liệu
        if (!existingAccount.isPresent()) {
            TaiKhoanCuaNguoiDung savedAccount = taiKhoanCuaNguoiDungRepository.save(taiKhoanCuaNguoiDung);
            return savedAccount; // Trả về tài khoản đã được lưu
        } else {
            // Xử lý trường hợp tên đăng nhập đã tồn tại
            throw new RuntimeException("Tên đăng nhập đã tồn tại."); // Hoặc bạn có thể trả về một giá trị khác
        }
    }

    @Override
    public boolean xacThucEmail(String userName, String email) {
        Optional<TaiKhoanCuaNguoiDung> existingAccount = taiKhoanCuaNguoiDungRepository.findById(userName);

        // Kiểm tra xem tài khoản có tồn tại không
        if (existingAccount.isPresent()) {
            // So sánh chuỗi bằng phương thức equals()
            return email.equals(existingAccount.get().getEmail());
        }
        return false; // Nếu tài khoản không tồn tại, trả về false

    }
}
