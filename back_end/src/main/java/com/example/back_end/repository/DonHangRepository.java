package com.example.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.back_end.modal.Donhang;
@Repository
public interface DonHangRepository extends JpaRepository<Donhang, Integer> {

}

