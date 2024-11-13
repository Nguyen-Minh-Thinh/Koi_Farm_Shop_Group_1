package com.example.back_end.controller;

import com.example.back_end.modal.GioHang;
import com.example.back_end.modal.GioHangDTO;
import com.example.back_end.service.GioHangService;
import com.example.back_end.service.GioHangServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class GioHangController {

    @Autowired
    GioHangServiceImple gioHangServiceImple;

    @CrossOrigin(origins = "*")
    @GetMapping("/giohang/{userName}")
    public List<GioHangDTO> getGioHangByUserName(@PathVariable String userName) {
        return gioHangServiceImple.getGioHangByUserName(userName);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/giohang/delete")
    public ResponseEntity<String> deleteGioHangByItemID(@RequestBody HashMap<String, String> body) {
        try {
            boolean isDeleted = gioHangServiceImple.deleteByUserNameAndItemID(body);

            if (isDeleted) {
                // Trả về mã trạng thái 204 No Content nếu xóa thành công và không có nội dung trả về
//                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

                // Hoặc, nếu muốn trả về thông báo xóa thành công (dùng mã 200 OK)
                 return ResponseEntity.ok("Xóa sản phẩm thành công");
            } else {
                // Trả về mã trạng thái 404 nếu không tìm thấy mục cần xóa
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm.");
            }

        } catch (Exception e) {
            // Trả về mã trạng thái 500 nếu xảy ra lỗi trên server
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa sản phẩm!");
        }
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/giohang/{userName}")
    public ResponseEntity<String> deleteGioHang(@PathVariable String userName) {
        try{
            boolean isDeleted = gioHangServiceImple.deleteGioHang(userName);
            if (isDeleted) {
                // Trả về mã trạng thái 204 No Content nếu xóa thành công và không có nội dung trả về
//                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

                // Hoặc, nếu muốn trả về thông báo xóa thành công (dùng mã 200 OK)
                return ResponseEntity.ok("Xóa sản phẩm thành công");
            } else {
                // Trả về mã trạng thái 404 nếu không tìm thấy mục cần xóa
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm.");
            }
        } catch (Exception e) {
            // Trả về mã trạng thái 500 nếu xảy ra lỗi trên server
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa sản phẩm!");
        }

    }


}
