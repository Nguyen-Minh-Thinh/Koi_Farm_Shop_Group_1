package com.example.back_end.service;


import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.Loaica;
import com.example.back_end.repository.LoaiCaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoaiCaServiceImple implements LoaiCaService {

    @Autowired
    private LoaiCaRepository loaiCaRepository;

    public ArrayList<Loaica> findAllLoaiCa(){
        return (ArrayList<Loaica>) loaiCaRepository.findAll();
    };

    @Override
    public List<CaKoiNhat> findAllLoaiCaById(String id) {
        // Lấy danh sách Object[] từ repository
        List<Object[]> result = loaiCaRepository.getAllLoaiCaById(id);

        // Chuyển đổi từng Object[] thành CaKoiNhat
        List<CaKoiNhat> caKoiNhatList = new ArrayList<>();
        for (Object[] row : result) {
            // Chuyển đổi các giá trị trong Object[] thành các trường trong CaKoiNhat theo thứ tự
            String image = (String) row[0];           // image
            String saleStatus = (String) row[1];      // sale_status
            String nameOfFish = (String) row[2];      // name_of_fish
            String idOfFish = (String) row[3];        // id_of_fish
            String note = (String) row[4];            // note
            String salePerson = (String) row[5];      // sale_person
            String sexOfFish = (String) row[6];       // sex_of_fish
            String dobOfFish = (String) row[7];       // dob_of_fish
            String sizeOfFish = (String) row[8];      // size_of_fish
            String typeOfFish = (String) row[9];      // type_of_fish
            String originOfFish = (String) row[10];   // origin_of_fish
            String price = (String) row[11];          // price

            // Tạo đối tượng CaKoiNhat và thêm vào danh sách
            CaKoiNhat caKoiNhat = new CaKoiNhat();
            caKoiNhat.setImage(image);
            caKoiNhat.setSaleStatus(saleStatus);
            caKoiNhat.setNameOfFish(nameOfFish);
            caKoiNhat.setIdOfFish(idOfFish);          // Gán id_of_fish
            caKoiNhat.setNote(note);
            caKoiNhat.setSalePerson(salePerson);
            caKoiNhat.setSexOfFish(sexOfFish);
            caKoiNhat.setDobOfFish(dobOfFish);
            caKoiNhat.setSizeOfFish(sizeOfFish);
            caKoiNhat.setTypeOfFish(typeOfFish);
            caKoiNhat.setOriginOfFish(originOfFish);
            caKoiNhat.setPrice(price);

            caKoiNhatList.add(caKoiNhat);
        }

        return caKoiNhatList;
    }

    @Autowired
    private LoaiCaRepository loaicaRepository;

    public List<Loaica> getAllLoaiCa() {
        return loaicaRepository.findAll();
    }

    public Optional<Loaica> getLoaiCaById(String typeOfFish) {
        return loaicaRepository.findById(typeOfFish);
    }

    public Loaica addLoaiCa(Loaica loaica) {
        return loaicaRepository.save(loaica);
    }

    public Loaica updateLoaiCa(String typeOfFish, Loaica loaicaDetails) {
        Optional<Loaica> loaicaOptional = loaicaRepository.findById(typeOfFish);
        if (loaicaOptional.isPresent()) {
            Loaica loaica = loaicaOptional.get();
            loaica.setImage(loaicaDetails.getImage());
            loaica.setVideo(loaicaDetails.getVideo());
            return loaicaRepository.save(loaica);
        } else {
            return null;
        }
    }

    public void deleteLoaiCa(String typeOfFish) {
        loaicaRepository.deleteById(typeOfFish);
    }

}
