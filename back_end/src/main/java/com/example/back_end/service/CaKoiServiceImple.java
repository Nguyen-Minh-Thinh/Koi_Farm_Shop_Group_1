package com.example.back_end.service;

import java.util.Optional;
import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.repository.CaKoiNhatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class CaKoiServiceImple implements CaKoiService{

    @Autowired
    CaKoiNhatRepository caKoiNhatRepository;

    @Override
    public ArrayList<CaKoiNhat> findAllCaKoiNhat() {
        return (ArrayList<CaKoiNhat>) caKoiNhatRepository.findAll();
    }

    @Override
    public CaKoiNhat findCaKoiNhatById(String id) {
        Optional<CaKoiNhat> opt = caKoiNhatRepository.findById(id);
        if (opt.isPresent())
            return opt.get();
        else
            return null;
    }

}
