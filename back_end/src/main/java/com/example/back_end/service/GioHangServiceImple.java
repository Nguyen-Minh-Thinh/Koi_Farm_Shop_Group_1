package com.example.back_end.service;

import com.example.back_end.modal.GioHang;
import com.example.back_end.modal.GioHangDTO;
import com.example.back_end.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class GioHangServiceImple implements GioHangService {

    @Autowired
    GioHangRepository gioHangRepository;

    @Override
    public List<GioHangDTO> getGioHangByUserName(String userName) {
        // Lấy danh sách Object[] từ repository
        List<Object[]> result = gioHangRepository.findByTaiKhoanNguoiDung_UserName(userName);

        // Chuyển đổi từng Object[] thành GioHangDTO
        List<GioHangDTO> gioHangDTOList = new ArrayList<>();
        for (Object[] row : result) {
            Integer id = (Integer) row[0];               // id
            String idOfFish = (String) row[1];           // id_of_fish
            Integer tongCong = (Integer) row[2];         // Giá (tongCong)
            String taiKhoanNguoiDung = (String) row[3];  // tai_khoan_nguoi_dung

            // Kiểm tra dữ liệu để xác định loại sản phẩm
            String tenSanPham = null;
            String image = null;

            if (row[4] != null) { // Sản phẩm từ bảng ca_koi_nhat
                tenSanPham = (String) row[4];
                image = (String) row[5];
            } else if (row[6] != null) { // Sản phẩm từ bảng thuc_an_cho_ca
                tenSanPham = (String) row[6];
                image = (String) row[7]; // Bảng thuc_an_cho_ca có thể không có cột image
            }

            // Tạo đối tượng GioHangDTO
            GioHangDTO dto = new GioHangDTO(id, idOfFish, tongCong, taiKhoanNguoiDung, tenSanPham, image);
            gioHangDTOList.add(dto);
        }

        return gioHangDTOList;
    }


    @Override
    public boolean deleteByUserNameAndItemID(HashMap<String, String> body){
        String userName = body.get("username");
        String itemID = body.get("id_of_fish");

        // Thực hiện xóa và lấy số lượng bản ghi bị xóa
        int deletedCount = gioHangRepository.deleteByUserNameAndItemID(userName, itemID);

        // Trả về true nếu ít nhất một bản ghi bị xóa, ngược lại trả về false
        return deletedCount > 0;
    };

    @Override
    public boolean deleteGioHang(String userName) {
        // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
        return gioHangRepository.deleteByUserName(userName) > 0;
    }
    @Override
    public boolean addToGioHang(GioHang gioHang) {
        try {
            // Ensure the userName is set in the GioHang object
            if (gioHang.getTaiKhoanNguoiDung() == null) {
                throw new IllegalArgumentException("UserName is required for the cart item.");
            }

            // Save the GioHang object to the repository
            gioHangRepository.save(gioHang);
            return true;
        } catch (Exception e) {
            // Log the exception or print for debugging purposes (optional)
            e.printStackTrace();
            return false;
        }
    }

}