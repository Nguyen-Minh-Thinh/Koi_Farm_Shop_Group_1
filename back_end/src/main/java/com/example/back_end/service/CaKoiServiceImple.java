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

    // Add new fish
    public CaKoiNhat addFish(CaKoiNhat caKoiNhat) {
        return caKoiNhatRepository.save(caKoiNhat);
    }

    // Update fish details
    public CaKoiNhat updateFish(String id, CaKoiNhat updatedFish) {
        Optional<CaKoiNhat> optionalFish = caKoiNhatRepository.findById(id);
        if (optionalFish.isPresent()) {
            CaKoiNhat existingFish = optionalFish.get();
            existingFish.setImage(updatedFish.getImage());
            existingFish.setSaleStatus(updatedFish.getSaleStatus());
            existingFish.setNameOfFish(updatedFish.getNameOfFish());
            existingFish.setNote(updatedFish.getNote());
            existingFish.setPrice(updatedFish.getPrice());
            existingFish.setSalePerson(updatedFish.getSalePerson());
            existingFish.setSexOfFish(updatedFish.getSexOfFish());
            existingFish.setDobOfFish(updatedFish.getDobOfFish());
            existingFish.setSizeOfFish(updatedFish.getSizeOfFish());
            existingFish.setOriginOfFish(updatedFish.getOriginOfFish());
            existingFish.setTypeOfFish(updatedFish.getTypeOfFish());
            return caKoiNhatRepository.save(existingFish);
        } else {
            return null;
        }
    }

    // Delete fish by ID
    public boolean deleteFish(String id) {
        Optional<CaKoiNhat> optionalFish = caKoiNhatRepository.findById(id);
        if (optionalFish.isPresent()) {
            caKoiNhatRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
