package com.example.back_end.service;

import com.example.back_end.modal.GioiThieu;
import com.example.back_end.repository.GioiThieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class GioiThieuServiceImple implements GioiThieuService {

    @Autowired
    private GioiThieuRepository gioiThieuRepository;

    public ArrayList<GioiThieu> findAllGioiThieu(){
        return (ArrayList<GioiThieu>) gioiThieuRepository.findAll();
    };

    public GioiThieu findGioiThieuById(String id){
        return gioiThieuRepository.findById(id).get();
    }
}
