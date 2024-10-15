package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "donhang", schema = "koi_farm_shop")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Donhang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @Size(max = 255)
    @Column(name = "delivery_time")
    private String deliveryTime;

    @NotNull
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Size(max = 50)
    @NotNull
    @Column(name = "pay", nullable = false, length = 50)
    private String pay;

    @NotNull
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Size(max = 50)
    @Column(name = "user_name", length = 50)
    private String userName;

    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Chitietdonhang> donHangDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<TinhTrangDonHang> ttDonhangid = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "don_hang_id", referencedColumnName = "don_hang_id")
    private Chitietdonhang donHang;

    public Chitietdonhang getDonHang() {
        return donHang;
    }

    public void setDonHang(Chitietdonhang donHang) {
        this.donHang = donHang;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Set<Chitietdonhang> getDonHangDetails() {
        return donHangDetails;
    }

    public void setDonHangDetails(Set<Chitietdonhang> donHangDetails) {
        this.donHangDetails = donHangDetails;
    }

    public Set<TinhTrangDonHang> getTtDonhangid() {
        return ttDonhangid;
    }

    public void setTtDonhangid(Set<TinhTrangDonHang> ttDonhangid) {
        this.ttDonhangid = ttDonhangid;
    }

    //    public TinhTrangDonHang getTtDonhangid() {
//        return ttDonhangid;
//    }
//
//    public void setTtDonhangid(TinhTrangDonHang ttDonhangid) {
//        this.ttDonhangid = ttDonhangid;
//    }
}