package com.example.back_end.service;

import com.example.back_end.modal.CaKoiNhat;

import java.util.ArrayList;

public interface CaKoiService {
    ArrayList<CaKoiNhat> findAllCaKoiNhat();

    CaKoiNhat findCaKoiNhatById(String id);

}
