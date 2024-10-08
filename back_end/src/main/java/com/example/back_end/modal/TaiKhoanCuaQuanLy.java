package com.example.back_end.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tai_khoan_cua_quan_ly")
public class TaiKhoanCuaQuanLy {
    @Id
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Column(name = "pass_word", nullable = false, length = 50)
    private String passWord;

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

}