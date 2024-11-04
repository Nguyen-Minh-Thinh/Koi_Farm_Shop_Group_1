package com.example.back_end.controller;

import com.example.back_end.modal.TaiKhoanCuaNguoiDung;
import com.example.back_end.repository.TaiKhoanCuaNguoiDungRepository;
import com.example.back_end.service.TaiKhoanCuaNguoiDungServiceImple;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class TaiKhoanCuaNguoiDungController {
    @Autowired
    private TaiKhoanCuaNguoiDungServiceImple taiKhoanCuaNguoiDungServiceImple;
    @Autowired
    private TaiKhoanCuaNguoiDungRepository taiKhoanRepository;

    @CrossOrigin(origins = "http://127.0.0.1:5501", allowCredentials = "true")
    @PostMapping("/user/login")
    public Map<String, String> login(@RequestBody HashMap<String, String> map, HttpSession session, HttpServletResponse response) {
        String userName = map.get("userName");
        String password = map.get("passWord");

        Map<String, String> account = taiKhoanCuaNguoiDungServiceImple.xacThucDangNhap(userName, password);

        if (account != null) {
            session.setAttribute("userName", userName); // Lưu thông tin người dùng vào session

            // Thiết lập cookie với SameSite attribute
            Cookie cookie = new Cookie("SESSIONID", session.getId());
            cookie.setPath("/");
//            cookie.setHttpOnly(true);
            cookie.setMaxAge(-1); // -1 có nghĩa là cookie sẽ tồn tại cho đến khi trình duyệt đóng
            cookie.setAttribute("SameSite", "None"); // Hoặc "Lax" nếu bạn không cần cross-origin

            response.addCookie(cookie); // Đảm bảo rằng bạn đã import đúng HttpServletResponse
            return account; // Đăng nhập thành công
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }

    @CrossOrigin(origins = "http://127.0.0.1:5501", allowCredentials = "true")
    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // Xóa session
        return ResponseEntity.ok("Logout successful");
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/user/session")
    public ResponseEntity<Map<String, String>> checkSession(HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        Map<String, String> response = new HashMap<>();

        if (userName != null) {
            response.put("userName", userName);
            return ResponseEntity.ok(response); // Trả về thông tin người dùng
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Chưa đăng nhập
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
    public ResponseEntity<?> register(@RequestBody HashMap<String, String> request)         {
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

    // Get all accounts
    @CrossOrigin(origins = "*")
    @GetMapping("/api/taikhoan/all")
    public ResponseEntity<List<TaiKhoanCuaNguoiDung>> getAllAccounts() {
        List<TaiKhoanCuaNguoiDung> accounts = taiKhoanRepository.findAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    // Get account by username
    @CrossOrigin(origins = "*")
    @GetMapping("/api/taikhoan/{userName}")
    public ResponseEntity<TaiKhoanCuaNguoiDung> getAccountByUsername(@PathVariable String userName) {
        Optional<TaiKhoanCuaNguoiDung> account = taiKhoanRepository.findById(userName);
        return account.map(taikhoan -> new ResponseEntity<>(taikhoan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create new account
    @CrossOrigin(origins = "*")
    @PostMapping("/api/taikhoan/create")
    public ResponseEntity<TaiKhoanCuaNguoiDung> createAccount(@RequestBody TaiKhoanCuaNguoiDung newAccount) {
        if (taiKhoanRepository.existsById(newAccount.getUserName())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        TaiKhoanCuaNguoiDung createdAccount = taiKhoanRepository.save(newAccount);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    // Update account
    @CrossOrigin(origins = "*")
    @PutMapping("/api/taikhoan/update/{userName}")
    public ResponseEntity<TaiKhoanCuaNguoiDung> updateAccount(@PathVariable String userName, @RequestBody TaiKhoanCuaNguoiDung updatedAccount) {
        Optional<TaiKhoanCuaNguoiDung> existingAccount = taiKhoanRepository.findById(userName);
        if (existingAccount.isPresent()) {
            TaiKhoanCuaNguoiDung account = existingAccount.get();
            account.setPassWord(updatedAccount.getPassWord());
            account.setEmail(updatedAccount.getEmail());
            account.setPhoneNumber(updatedAccount.getPhoneNumber());
            account.setTenKhachHang(updatedAccount.getTenKhachHang());
//            account.setDiaChi(updatedAccount.getDiaChi());
            TaiKhoanCuaNguoiDung savedAccount = taiKhoanRepository.save(account);
            return new ResponseEntity<>(savedAccount, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete account
    @CrossOrigin(origins = "*")
    @DeleteMapping("/api/taikhoan/delete/{userName}")
    public ResponseEntity<HttpStatus> deleteAccount(@PathVariable String userName) {
        if (taiKhoanRepository.existsById(userName)) {
            taiKhoanRepository.deleteById(userName);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}