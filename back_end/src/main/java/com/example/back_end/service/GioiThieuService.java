package com.example.back_end.service;


import com.example.back_end.modal.GioiThieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.ArrayList;
import java.lang.reflect.Array;

public interface GioiThieuService{
    ArrayList<GioiThieu> findAllGioiThieu();
    GioiThieu findGioiThieuById(String id);

}