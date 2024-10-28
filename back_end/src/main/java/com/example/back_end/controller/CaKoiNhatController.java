package com.example.back_end.controller;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.service.CaKoiServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private CaKoiServiceImple caKoiNhatService;

    // Add new fish
    @CrossOrigin(origins = "*")
    @PostMapping("/api/fish/create")
    public CaKoiNhat addFish(@RequestBody CaKoiNhat caKoiNhat) {
        return caKoiNhatService.addFish(caKoiNhat);
    }

    // Update fish details
    @CrossOrigin(origins = "*")
    @PutMapping("/api/fish/update/{id}")
    public CaKoiNhat updateFish(@PathVariable String id, @RequestBody CaKoiNhat updatedFish) {
        return caKoiNhatService.updateFish(id, updatedFish);
    }

    // Delete fish by ID
    @CrossOrigin(origins = "*")
    @DeleteMapping("/api/fish/{id}")
    public boolean deleteFish(@PathVariable String id) {
        return caKoiNhatService.deleteFish(id);
    }

}
