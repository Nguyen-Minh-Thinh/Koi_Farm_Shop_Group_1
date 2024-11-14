package com.example.back_end.modal;

public class GioHangDTO{
    private Integer id;
    private String id_of_fish;

    private Integer tongCong;
    private String tai_khoan_nguoi_dung;
    private String tenSanPham;
    private String image;

    public GioHangDTO(Integer id, String id_of_fish, Integer tongCong, String tai_khoan_nguoi_dung, String tenSanPham, String image) {
        this.id = id;
        this.id_of_fish = id_of_fish;

        this.tongCong = tongCong;
        this.tai_khoan_nguoi_dung = tai_khoan_nguoi_dung;
        this.tenSanPham = tenSanPham;
        this.image = image;
    }

    public String getTai_khoan_nguoi_dung() {
        return tai_khoan_nguoi_dung;
    }

    public void setTai_khoan_nguoi_dung(String tai_khoan_nguoi_dung) {
        this.tai_khoan_nguoi_dung = tai_khoan_nguoi_dung;
    }

    public String getId_of_fish() {
        return id_of_fish;
    }

    public void setId_of_fish(String id_of_fish) {
        this.id_of_fish = id_of_fish;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public Integer getTongCong() {
        return tongCong;
    }

    public void setTongCong(Integer tongCong) {
        this.tongCong = tongCong;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
