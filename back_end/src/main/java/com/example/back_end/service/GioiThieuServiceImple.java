package com.example.back_end.service;


import com.example.back_end.modal.Loaica;
import com.example.back_end.repository.GioiThieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class GioiThieuServiceImple implements GioiThieuService {

    @Autowired
    private GioiThieuRepository gioiThieuRepository;

    public ArrayList<Loaica> findAllGioiThieu(){
        return (ArrayList<Loaica>) gioiThieuRepository.findAll();
    };

    public Loaica findGioiThieuById(String id){
        return gioiThieuRepository.findById(id).get();
    }
}
