package com.example.back_end.controller;


import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.ThucAnChoCa;
import com.example.back_end.repository.ThucAnChoCaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ThucAnChoCaController {

    @Autowired
    ThucAnChoCaRepository thucAnChoCaRepository;

    @CrossOrigin(origins = "*")
    @GetMapping("/thuc-an-cho-ca")
    public List<Map<String, Object>> getAllThucAnChoCa() {
        List<ThucAnChoCa> thucAnChoCaList = thucAnChoCaRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (ThucAnChoCa item : thucAnChoCaList) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", item.getId());
            map.put("image", item.getImage());
            map.put("caption", item.getCaption());
            map.put("note", item.getNote());
            map.put("price", item.getPrice());
            map.put("salePerson", item.getSalePerson());
            map.put("brand", item.getBrand());
            map.put("typeOfFood", item.getTypeOfFood());
            map.put("origin", item.getOrigin());
            map.put("weight", item.getWeight());
            map.put("saleStatus", item.getSaleStatus());

            result.add(map);
        }
        return result;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/thuc-an-cho-ca/{id}")
    public ThucAnChoCa getCaKoiNhatById(@PathVariable String id) {
        return thucAnChoCaRepository.findById(id).get();
    }
}
