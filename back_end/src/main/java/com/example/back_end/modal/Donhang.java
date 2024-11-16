package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    private String orderDate;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phone_number", referencedColumnName = "phone_number")
    private TaiKhoanCuaNguoiDung phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khuyen_mai", referencedColumnName = "id")
    private KhuyenMai khuyenMai;

    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // Mối quan hệ với Chitietdonhang
    @JsonManagedReference
    private Set<Chitietdonhang> chitietdonhangs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // Giả định là bạn có lớp TinhTrangDonHang
    @JsonManagedReference
    private Set<TinhTrangDonHang> tinhTrangDonHangs = new LinkedHashSet<>();

    // Getter và Setter
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

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
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

    public TaiKhoanCuaNguoiDung getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(TaiKhoanCuaNguoiDung phoneNumber) {
        this.phoneNumber = phoneNumber;
    }



    public KhuyenMai getKhuyenMai() {
        return khuyenMai;
    }

    public void setKhuyenMai(KhuyenMai khuyenMai) {
        this.khuyenMai = khuyenMai;
    }

    public Set<Chitietdonhang> getChitietdonhangs() {
        return chitietdonhangs;
    }

    public void setChitietdonhangs(Set<Chitietdonhang> chitietdonhangs) {
        this.chitietdonhangs = chitietdonhangs;
    }

    public Set<TinhTrangDonHang> getTinhTrangDonHangs() {
        return tinhTrangDonHangs;
    }

    public void setTinhTrangDonHangs(Set<TinhTrangDonHang> tinhTrangDonHangs) {
        this.tinhTrangDonHangs = tinhTrangDonHangs;
    }
}
