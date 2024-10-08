package com.example.back_end.controller;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.service.CaKoiServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class CaKoiNhatController {

    @Autowired
    CaKoiServiceImple caKoiServiceImple;

    @CrossOrigin(origins = "*")
    @GetMapping("/ca-koi-nhat")
    public ArrayList<CaKoiNhat> getAllCaKoiNhat() {
        return caKoiServiceImple.findAllCaKoiNhat();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/ca-koi-nhat/{id}")
    public CaKoiNhat getCaKoiNhatById(@PathVariable String id) {
        return caKoiServiceImple.findCaKoiNhatById(id);
    }
}
