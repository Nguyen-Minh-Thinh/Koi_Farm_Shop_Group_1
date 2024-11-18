package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "gio_hang", schema = "koi_farm_shop")
public class GioHang {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_of_fish")
//    private CaKoiNhat idOfFish;

    @Column(name = "tong_cong")
    private Integer tongCong;

    @Column(name="tai_khoan_nguoi_dung")
    private String taiKhoanNguoiDung;

    @Column(name = "id_of_fish")
    private String idOfFish;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "tai_khoan_nguoi_dung")
//    private TaiKhoanCuaNguoiDung taiKhoanNguoiDung;
//

    public String getTaiKhoanNguoiDung() {
        return taiKhoanNguoiDung;
    }

    public void setTaiKhoanNguoiDung(String taiKhoanNguoiDung) {
        this.taiKhoanNguoiDung = taiKhoanNguoiDung;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIdOfFish() {
        return idOfFish;
    }

    public void setIdOfFish(String idOfFish) {
        this.idOfFish = idOfFish;
    }


    public Integer getTongCong() {
        return tongCong;
    }

    public void setTongCong(Integer tongCong) {
        this.tongCong = tongCong;
    }

}