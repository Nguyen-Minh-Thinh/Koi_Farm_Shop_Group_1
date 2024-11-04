package com.example.back_end.service;

import com.example.back_end.modal.KhuyenMai;
import com.example.back_end.repository.KhuyenMaiRepository;
import com.example.back_end.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    private final KhuyenMaiRepository khuyenMaiRepository;

    @Autowired
    public KhuyenMaiServiceImpl(KhuyenMaiRepository khuyenMaiRepository) {
        this.khuyenMaiRepository = khuyenMaiRepository;
    }

    @Override
    public List<KhuyenMai> getAllKhuyenMai() {
        return khuyenMaiRepository.findAll();
    }

    @Override
    public Optional<KhuyenMai> getKhuyenMaiById(Integer id) {
        return khuyenMaiRepository.findById(id);
    }

    @Override
    public KhuyenMai addKhuyenMai(KhuyenMai khuyenMai) {
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public KhuyenMai updateKhuyenMai(Integer id, KhuyenMai updatedKhuyenMai) {
        return khuyenMaiRepository.findById(id)
                .map(khuyenMai -> {
                    khuyenMai.setTenKhuyenMai(updatedKhuyenMai.getTenKhuyenMai());
                    khuyenMai.setGiamGiaPercent(updatedKhuyenMai.getGiamGiaPercent());
                    khuyenMai.setNgayBatDau(updatedKhuyenMai.getNgayBatDau());
                    khuyenMai.setNgayKetThuc(updatedKhuyenMai.getNgayKetThuc());
                    return khuyenMaiRepository.save(khuyenMai);
                })
                .orElseThrow(() -> new RuntimeException("Khuyến mãi không tồn tại với ID: " + id));
    }

    @Override
    public void deleteKhuyenMai(Integer id) {
        if (khuyenMaiRepository.existsById(id)) {
            khuyenMaiRepository.deleteById(id);
        } else {
            throw new RuntimeException("Khuyến mãi không tồn tại với ID: " + id);
        }
    }
}
