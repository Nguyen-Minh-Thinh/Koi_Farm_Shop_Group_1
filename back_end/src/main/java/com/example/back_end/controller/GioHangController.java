package com.example.back_end.controller;

import com.example.back_end.modal.GioHang;
import com.example.back_end.modal.GioHangDTO;
import com.example.back_end.service.GioHangService;
import com.example.back_end.service.GioHangServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GioHangController {

    @Autowired
    GioHangServiceImple gioHangServiceImple;

    @CrossOrigin(origins = "*")
    @GetMapping("/giohang/{userName}")
    public List<GioHangDTO> getGioHangByUserName(@PathVariable String userName) {
        return gioHangServiceImple.getGioHangByUserName(userName);
    }




}
