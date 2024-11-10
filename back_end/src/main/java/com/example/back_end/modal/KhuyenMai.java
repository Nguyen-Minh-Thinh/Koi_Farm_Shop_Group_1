package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "khuyen_mai", schema = "koi_farm_shop")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "ma_khuyen_mai")
    private String maKhuyenMai;

    @Size(max = 255)
    @Column(name = "ten_khuyen_mai")
    private String tenKhuyenMai;

    @Size(max = 40)
    @Column(name = "giam_gia_percent", length = 40)
    private String giamGiaPercent;

    @NotNull
    @Column(name = "ngay_bat_dau", nullable = false)
    private LocalDate ngayBatDau;

    @NotNull
    @Column(name = "ngay_ket_thuc", nullable = false)
    private LocalDate ngayKetThuc;

    @OneToMany(mappedBy = "khuyenMai", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Donhang> donhangs = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaKhuyenMai() {return maKhuyenMai;}
    public void setMaKhuyenMai(String maKhuyenMai) {this.maKhuyenMai = maKhuyenMai;}

    public String getTenKhuyenMai() {
        return tenKhuyenMai;
    }

    public void setTenKhuyenMai(String tenKhuyenMai) {
        this.tenKhuyenMai = tenKhuyenMai;
    }

    public String getGiamGiaPercent() {
        return giamGiaPercent;
    }

    public void setGiamGiaPercent(String giamGiaPercent) {
        this.giamGiaPercent = giamGiaPercent;
    }

    public LocalDate getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(LocalDate ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public LocalDate getNgayKetThuc() {
        return ngayKetThuc;
    }

    public void setNgayKetThuc(LocalDate ngayKetThuc) {
        this.ngayKetThuc = ngayKetThuc;
    }

}