package com.example.back_end.controller;

import com.example.back_end.modal.Loaica;
import com.example.back_end.service.GioiThieuService;
import com.example.back_end.service.GioiThieuServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class GioiThieuController {

    @Autowired
    GioiThieuServiceImple gioiThieuServiceImple;

    @CrossOrigin(origins = "*")
    @GetMapping("/gioi-thieu")
    public ArrayList<Loaica> getAllGioiThieu() {
        return gioiThieuServiceImple.findAllGioiThieu();
    };

    @CrossOrigin(origins = "*")
    @GetMapping("/gioi-thieu/{id}")
    public Loaica getGioiThieuById(@PathVariable String id) {
        return gioiThieuServiceImple.findGioiThieuById(id);
    }

}
