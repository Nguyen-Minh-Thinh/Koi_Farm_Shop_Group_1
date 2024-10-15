package com.example.back_end.repository;

import com.example.back_end.modal.Donhang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<Donhang, Integer> {

}

