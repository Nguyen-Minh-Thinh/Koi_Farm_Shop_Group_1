package com.example.back_end.controller;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.Loaica;
import com.example.back_end.service.LoaiCaServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LoaiCaController {

    @Autowired
    LoaiCaServiceImple loaiCaServiceImple;

    @CrossOrigin(origins = "*")
    @GetMapping("/loai-ca")
    public ArrayList<Loaica> getAllGioiThieu() {
        return loaiCaServiceImple.findAllLoaiCa();
    };

    @CrossOrigin(origins = "*")
    @GetMapping("/loai-ca/{id}")
    public List<CaKoiNhat> getGioiThieuById(@PathVariable String id) {
        return loaiCaServiceImple.findAllLoaiCaById(id);
    }

}
