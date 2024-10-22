package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "chitietdonhang", schema = "koi_farm_shop")
public class Chitietdonhang {
    @EmbeddedId
    private ChitietdonhangId id;

    @MapsId("donHangId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "don_hang_id", nullable = false)
    private Donhang donHang; // Đảm bảo tên thuộc tính này là "donHang"

    @MapsId("idOfFish")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_of_fish", nullable = false)
    private CaKoiNhat idOfFish;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // Phần này đã xóa
    // @OneToMany(mappedBy = "donHang")
    // private Set<Donhang> donhangs = new LinkedHashSet<>();

    // Getter và Setter
    public ChitietdonhangId getId() {
        return id;
    }

    public void setId(ChitietdonhangId id) {
        this.id = id;
    }

    public Donhang getDonHang() {
        return donHang;
    }

    public void setDonHang(Donhang donHang) {
        this.donHang = donHang;
    }

    public CaKoiNhat getIdOfFish() {
        return idOfFish;
    }

    public void setIdOfFish(CaKoiNhat idOfFish) {
        this.idOfFish = idOfFish;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
