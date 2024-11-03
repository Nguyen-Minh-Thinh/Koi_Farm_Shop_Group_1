package com.example.back_end.service;

import com.example.back_end.modal.KhuyenMai;

import java.util.List;
import java.util.Optional;

public interface KhuyenMaiService {

    List<KhuyenMai> getAllKhuyenMai();

    Optional<KhuyenMai> getKhuyenMaiById(Integer id);

    KhuyenMai addKhuyenMai(KhuyenMai khuyenMai);

    KhuyenMai updateKhuyenMai(Integer id, KhuyenMai updatedKhuyenMai);

    void deleteKhuyenMai(Integer id);
}
