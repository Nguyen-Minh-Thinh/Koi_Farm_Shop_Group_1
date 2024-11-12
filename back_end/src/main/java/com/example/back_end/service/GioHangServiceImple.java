package com.example.back_end.service;

import com.example.back_end.modal.GioHangDTO;
import com.example.back_end.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            // Chuyển đổi các giá trị trong Object[] thành các trường trong DTO
            Integer id = (Integer) row[0];           // id
            String idOfFish = (String) row[1];       // id_of_fish
            Integer soLuong = (Integer) row[2];      // soLuong
            Integer tongCong = (Integer) row[3];     // tongCong
            String taiKhoanNguoiDung = (String) row[4]; // tai_khoan_nguoi_dung
            String tenSanPham = (String) row[5];     // tenSanPham
            String image = (String) row[6];          // image

            // Tạo đối tượng GioHangDTO và thêm vào danh sách
            GioHangDTO dto = new GioHangDTO(id, idOfFish, soLuong, tongCong, taiKhoanNguoiDung,tenSanPham, image);
            gioHangDTOList.add(dto);

        }

        return gioHangDTOList;
    }
    @Override
    public void deleteGioHang(String userName) {
        // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
        gioHangRepository.deleteByUserName(userName);
    }
}
