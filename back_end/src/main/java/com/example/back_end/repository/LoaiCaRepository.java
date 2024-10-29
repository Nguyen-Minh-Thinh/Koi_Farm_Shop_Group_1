package com.example.back_end.repository;

import com.example.back_end.modal.CaKoiNhat;
import com.example.back_end.modal.Loaica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface LoaiCaRepository extends JpaRepository<Loaica, String> {
    @Query(value = "select * from ca_koi_nhat a where a.type_of_fish = :id", nativeQuery = true)
    List<Object[]> getAllLoaiCaById(@Param("id") String id);
}
