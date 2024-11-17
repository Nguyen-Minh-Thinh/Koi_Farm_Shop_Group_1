package com.example.back_end.service;

import com.example.back_end.modal.CaKoiNhat;

import java.util.ArrayList;
import java.util.Optional;

public interface CaKoiService {
    ArrayList<CaKoiNhat> findAllCaKoiNhat();

    CaKoiNhat findCaKoiNhatById(String id);
}
