package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tinh_trang_don_hang", schema = "koi_farm_shop")
public class TinhTrangDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Donhang order;

    @Size(max = 255)
    @NotNull
    @Column(name = "situation", nullable = false)
    private String situation;

    @Size(max = 255)
    @Column(name = "status_details")
    private String statusDetails;

    @Size(max = 255)
    @NotNull
    @Column(name = "times", nullable = false)
    private String times;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Donhang getOrder() {
        return order;
    }

    public void setOrder(Donhang order) {
        this.order = order;
    }

    public String getSituation() {
        return situation;
    }

    public void setSituation(String situation) {
        this.situation = situation;
    }

    public String getStatusDetails() {
        return statusDetails;
    }

    public void setStatusDetails(String statusDetails) {
        this.statusDetails = statusDetails;
    }

    public String getTimes() {
        return times;
    }

    public void setTimes(String times) {
        this.times = times;
    }

}