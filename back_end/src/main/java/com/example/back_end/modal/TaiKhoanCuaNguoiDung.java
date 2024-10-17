package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tai_khoan_cua_nguoi_dung")
    public class TaiKhoanCuaNguoiDung {
    @Id
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Column(name = "pass_word", length = 50)
    private String passWord;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Size(max = 255)
    @Column(name = "ten_khach_hang")
    private String tenKhachHang;

    @Size(max = 255)
    @Column(name = "dia_chi")
    private String diaChi;

    @OneToMany(mappedBy = "phoneNumber")
    private Set<Donhang> donhangs = new LinkedHashSet<>();

    public Set<Donhang> getDonhangs() {
        return donhangs;
    }

    public void setDonhangs(Set<Donhang> donhangs) {
        this.donhangs = donhangs;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTenKhachHang() {
        return tenKhachHang;
    }

    public void setTenKhachHang(String tenKhachHang) {
        this.tenKhachHang = tenKhachHang;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}