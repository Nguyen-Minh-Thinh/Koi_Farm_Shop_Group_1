package com.example.back_end.controller;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.repository.CaKoiNhatRepository;
import com.example.back_end.service.CaKoiServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CaKoiNhatController {

    @Autowired
    CaKoiServiceImple caKoiServiceImple;
    @Autowired
    CaKoiNhatRepository caKoiNhatRepository;

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


    @CrossOrigin(origins = "*")
    @GetMapping("/ca-koi-nhat/loai_ca/{type_of_fish}")
    public List<Map<String, Object>> getCaKoiNhatByType(@PathVariable String type_of_fish) {
        List<Object[]> results = caKoiNhatRepository.getCaKoiNhatByType(type_of_fish);

        List<Map<String, Object>> mappedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> rowMap = new HashMap<>();
            rowMap.put("image", result[0]);
            rowMap.put("sale_status", result[1]);
            rowMap.put("name_of_fish", result[2]);
            rowMap.put("id_of_fish", result[3]);
            rowMap.put("note", result[4]);
            rowMap.put("sale_person", result[5]);
            rowMap.put("sex_of_fish", result[6]);
            rowMap.put("dob_of_fish", result[7]);
            rowMap.put("size_of_fish", result[8]);
            rowMap.put("type_of_fish", result[9]);
            rowMap.put("origin_of_fish", result[10]);
            rowMap.put("price", result[11]);

            mappedResults.add(rowMap);
        }

        return mappedResults;
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

    @CrossOrigin(origins = "*")
    @GetMapping("/check/ca-koi-nhat/{id}")
    public ResponseEntity<Boolean> checkIfFishExists(@PathVariable("id") String id) {
        try {

            boolean exists = caKoiNhatRepository.existsById(id); // Kiểm tra sự tồn tại của id
            return new ResponseEntity<>(exists, HttpStatus.OK); // Trả về true hoặc false
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR); // Trả về false nếu có lỗi
        }
    }

}
