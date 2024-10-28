package com.example.back_end.controller;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.Loaica;
import com.example.back_end.service.LoaiCaService;
import com.example.back_end.service.LoaiCaServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private LoaiCaServiceImple loaicaService;

    @CrossOrigin(origins = "*")
    @GetMapping("/api/loaica")
    public List<Loaica> getAllLoaiCa() {
        return loaicaService.getAllLoaiCa();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/loaica/{id}")
    public ResponseEntity<Loaica> getLoaiCaById(@PathVariable String id) {
        Optional<Loaica> loaica = loaicaService.getLoaiCaById(id);
        return loaica.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/api/loaica")
    public Loaica createLoaiCa(@RequestBody Loaica loaica) {
        return loaicaService.addLoaiCa(loaica);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/api/loaica/{id}")
    public ResponseEntity<Loaica> updateLoaiCa(@PathVariable String id, @RequestBody Loaica loaicaDetails) {
        Loaica updatedLoaiCa = loaicaService.updateLoaiCa(id, loaicaDetails);
        if (updatedLoaiCa != null) {
            return ResponseEntity.ok(updatedLoaiCa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/api/loaica/{id}")
    public ResponseEntity<Void> deleteLoaiCa(@PathVariable String id) {
        loaicaService.deleteLoaiCa(id);
        return ResponseEntity.noContent().build();
    }

}
