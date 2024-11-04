package com.example.back_end.controller;

import com.example.back_end.repository.TaiKhoanCuaNguoiDungRepository;
import com.example.back_end.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
public class QuenMatKhau {

    @Autowired
    private EmailService emailService;

    @Autowired
    private TaiKhoanCuaNguoiDungRepository taiKhoanCuaNguoiDungRepository;
    // Khởi tạo một ConcurrentHashMap để lưu mã xác minh với thời gian giới hạn
    private final Map<String, String> verificationCodeCache = new ConcurrentHashMap<>();

    // ScheduledExecutorService để xóa mã sau 60 giây
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @CrossOrigin(origins = "http://127.0.0.1:5501", allowCredentials = "true")
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> request) {
        String username = request.get("userName");
        String email = request.get("email");

        // Kiểm tra xem username có tồn tại và lấy email (giả định đã có logic kiểm tra)
        if (!isUsernameExists(username)) {
            throw new RuntimeException("Tên đăng nhập không tồn tại.");
        }

        // Gửi mã qua email
        String verificationCode = generateVerificationCode(); // Tạo mã xác minh ngẫu nhiên
        emailService.sendResetPasswordEmail(email, verificationCode);

        // Lưu mã vào cache và xóa sau 60 giây
        verificationCodeCache.put(username, verificationCode);
        scheduler.schedule(() -> verificationCodeCache.remove(username), 60, TimeUnit.SECONDS);

        return "Mã xác minh đã được gửi qua email.";
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501", allowCredentials = "true")
    @PostMapping("/verify-reset-code")
    public String verifyResetCode(@RequestBody Map<String, String> request) {
        String username = request.get("userName");
        String resetCode = request.get("resetCode");

        // Kiểm tra mã xác minh với mã trong cache
        String cachedCode = verificationCodeCache.get(username);
        if (cachedCode != null && cachedCode.equals(resetCode)) {
            return "Mã xác minh hợp lệ.";
        } else {
            throw new RuntimeException("Mã xác minh không hợp lệ.");
        }
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501", allowCredentials = "true")
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {
        String username = request.get("userName");
        String newPassword = request.get("newPassword");

        // Cập nhật mật khẩu mới cho tài khoản người dùng
        int updatedRows = taiKhoanCuaNguoiDungRepository.updatePassword(username, newPassword);

        // Kiểm tra xem có bản ghi nào được cập nhật không
        if (updatedRows > 0) {
            return "Mật khẩu đã được đặt lại thành công.";
        } else {
            return "Không tìm thấy người dùng với tên đăng nhập: " + username;
        }
    }

    private String generateVerificationCode() {
        // Tạo mã ngẫu nhiên từ 6 chữ số
        return String.valueOf((int) (Math.random() * 1000000));
    }

    private boolean isUsernameExists(String username) {
        // Logic để kiểm tra xem username có tồn tại hay không (cần được triển khai)
        return true; // Trả về true cho ví dụ này
    }

}
