package com.example.back_end.controller;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;
import com.example.back_end.service.TaiKhoanCuaNguoiDungServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TaiKhoanCuaNguoiDungController {
    @Autowired
    private TaiKhoanCuaNguoiDungServiceImple taiKhoanCuaNguoiDungServiceImple;

    @CrossOrigin(origins = "*") // Co the duoc truy cap tu cac nguon cua frontend
    @PostMapping("/user/login")
    public TaiKhoanCuaNguoiDung login(@RequestBody HashMap<String, String> map) {
        String userName = map.get("userName");
        String password = map.get("passWord");

        TaiKhoanCuaNguoiDung account = taiKhoanCuaNguoiDungServiceImple.xacThucDangNhap(userName, password);

        if (account != null) {
            return account; // Đăng nhập thành công
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }

    @CrossOrigin(origins = "*") // Co the duoc truy cap tu cac nguon cua frontend
    @PostMapping("/user/register/user-name")
    public ResponseEntity<Map<String, Boolean>> registerAuthenticateUserName(@RequestBody HashMap<String, String> request) {
        String userName = request.get("userName"); // Lấy giá trị từ key 'username'
        boolean exists = taiKhoanCuaNguoiDungServiceImple.xacThucDangKyUserName(userName);

        // Tạo một Map để chứa phản hồi
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", !exists); // Nếu exists là false thì trả về true cho trường hợp tên đăng nhập đã tồn tại

        return ResponseEntity.ok(response); // Trả về đối tượng JSON với mã trạng thái 200 OK
    }

    @CrossOrigin(origins = "*") // Có thể được truy cập từ các nguồn của frontend
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody HashMap<String, String> request) {
        TaiKhoanCuaNguoiDung newObj = new TaiKhoanCuaNguoiDung();
        newObj.setUserName(request.get("userName"));
        newObj.setPassWord(request.get("passWord"));
        newObj.setEmail(request.get("email"));
        newObj.setPhoneNumber(request.get("phoneNumber"));
        try {
            TaiKhoanCuaNguoiDung newAccount = taiKhoanCuaNguoiDungServiceImple.xacThucDangKy(newObj);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAccount); // Trả về tài khoản đã được lưu với mã trạng thái 201 Created
        } catch (RuntimeException e) {
            // Xử lý trường hợp tên đăng nhập đã tồn tại
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // Trả về thông báo lỗi với mã trạng thái 409 Conflict
        } catch (Exception e) {
            // Xử lý các lỗi khác (nếu có)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã có lỗi xảy ra. Vui lòng thử lại."); // Trả về thông báo lỗi chung
        }
    }
    
    @CrossOrigin(origins = "*") // Có thể được truy cập từ các nguồn của frontend
    @PostMapping("/user/register/email")
    public ResponseEntity<String> authenticateEmail(@RequestBody HashMap<String, String> request) {
        String userName = request.get("userName");
        String email = request.get("email");

        boolean isEmailValid = taiKhoanCuaNguoiDungServiceImple.xacThucEmail(userName, email);

        if (isEmailValid) {
            // Nếu xác thực thành công, trả về mã trạng thái 200 OK
            return ResponseEntity.ok("Email is valid.");
        } else {
            // Nếu xác thực thất bại, trả về mã trạng thái 400 Bad Request
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email is not valid.");
        }
    }






}