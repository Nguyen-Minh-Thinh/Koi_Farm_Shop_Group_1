package com.example.back_end.repository;

import com.example.back_end.modal.CaKoiNhat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CaKoiNhatRepository extends JpaRepository<CaKoiNhat, String> {
    @Query(value = "select a.*\n" +
            "from ca_koi_nhat a join loai_ca b\n" +
            "on a.type_of_fish = b.type_of_fish\n" +
            "where b.type_of_fish = :type_of_fish;", nativeQuery = true)
    List<Object[]> getCaKoiNhatByType(@Param("type_of_fish") String type_of_fish);
}
