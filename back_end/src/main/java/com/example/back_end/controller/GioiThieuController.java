package com.example.back_end.controller;

import com.example.back_end.modal.GioiThieu;
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
    public ArrayList<GioiThieu> getAllGioiThieu() {
        return gioiThieuServiceImple.findAllGioiThieu();
    };

    @CrossOrigin(origins = "*")
    @GetMapping("/gioi-thieu/{id}")
    public GioiThieu getGioiThieuById(@PathVariable String id) {
        return gioiThieuServiceImple.findGioiThieuById(id);
    }

}
