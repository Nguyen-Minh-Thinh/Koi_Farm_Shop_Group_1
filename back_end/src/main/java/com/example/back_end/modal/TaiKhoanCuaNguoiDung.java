package com.example.back_end.modal;

import jakarta.persistence.*;

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