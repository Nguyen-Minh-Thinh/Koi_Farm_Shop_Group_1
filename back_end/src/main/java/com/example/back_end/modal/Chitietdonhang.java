package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "chitietdonhang", schema = "koi_farm_shop")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Chitietdonhang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "don_hang_id")
    @JsonBackReference
    private Donhang donHang;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_of_fish")
    private CaKoiNhat idOfFish;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
