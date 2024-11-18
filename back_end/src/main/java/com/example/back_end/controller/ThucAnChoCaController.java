package com.example.back_end.controller;


import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.ThucAnChoCa;
import com.example.back_end.repository.ThucAnChoCaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    // Add new food item
    @CrossOrigin(origins = "*")
    @PostMapping("/thuc-an-cho-ca/create")
    public ResponseEntity<ThucAnChoCa> createFoodItem(@RequestBody ThucAnChoCa foodItem) {
        try {
            ThucAnChoCa newFoodItem = thucAnChoCaRepository.save(foodItem);
            return new ResponseEntity<>(newFoodItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update existing food item
    @CrossOrigin(origins = "*")
    @PutMapping("/thuc-an-cho-ca/update/{id}")
    public ResponseEntity<ThucAnChoCa> updateFoodItem(@PathVariable("id") String id, @RequestBody ThucAnChoCa foodItem) {
        Optional<ThucAnChoCa> existingFoodItem = thucAnChoCaRepository.findById(id);

        if (existingFoodItem.isPresent()) {
            ThucAnChoCa updatedFood = existingFoodItem.get();
            updatedFood.setCaption(foodItem.getCaption());
            updatedFood.setTypeOfFood(foodItem.getTypeOfFood());
            updatedFood.setPrice(foodItem.getPrice());
            updatedFood.setWeight(foodItem.getWeight());
            updatedFood.setSaleStatus(foodItem.getSaleStatus());
            updatedFood.setImage(foodItem.getImage());
            updatedFood.setNote(foodItem.getNote());
            updatedFood.setSalePerson(foodItem.getSalePerson());
            updatedFood.setBrand(foodItem.getBrand());
            updatedFood.setOrigin(foodItem.getOrigin());
            return new ResponseEntity<>(thucAnChoCaRepository.save(updatedFood), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a food item
    @CrossOrigin(origins = "*")
    @DeleteMapping("/thuc-an-cho-ca/{id}")
    public ResponseEntity<HttpStatus> deleteFoodItem(@PathVariable("id") String id) {
        try {
            thucAnChoCaRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/check/thuc-an-cho-ca/{id}")
    public ResponseEntity<Boolean> checkIfFoodExists(@PathVariable("id") String id) {
        try {
            // Kiểm tra sự tồn tại của ID
            boolean exists = thucAnChoCaRepository.existsById(id);
            return new ResponseEntity<>(exists, HttpStatus.OK);
        } catch (Exception e) {
            // Trả về trạng thái lỗi
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @CrossOrigin(origins = "*")
//    @PutMapping("/api/fish/update/{id}")
//    public CaKoiNhat updateThucAnChoCa(@PathVariable String id, Body string updateValue) {
//        return .updateThucAnChoCa(id, updatedFish)
//    }
}
