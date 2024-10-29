package com.example.back_end.service;


import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.Loaica;

import java.util.ArrayList;
import java.util.List;

public interface LoaiCaService {
    ArrayList<Loaica> findAllLoaiCa();
    List<CaKoiNhat> findAllLoaiCaById(String id);

}
