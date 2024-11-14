package com.example.back_end.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "thuc_an_cho_ca", schema = "koi_farm_shop")
public class ThucAnChoCa {
    @Id
    @Size(max = 10)
    @Column(name = "Id", nullable = false, length = 10)
    private String id;

    @Lob
    @Column(name = "Image")
    private String image;

    @Lob
    @Column(name = "Caption")
    private String caption;

    @Lob
    @Column(name = "Note")
    private String note;

    @Size(max = 20)
    @Column(name = "Price", length = 20)
    private String price;

    @Size(max = 50)
    @Column(name = "Sale_person", length = 50)
    private String salePerson;

    @Size(max = 50)
    @Column(name = "Brand", length = 50)
    private String brand;

    @Size(max = 50)
    @Column(name = "Type_of_food", length = 50)
    private String typeOfFood;

    @Size(max = 50)
    @Column(name = "Origin", length = 50)
    private String origin;

    @Size(max = 20)
    @Column(name = "Weight", length = 20)
    private String weight;

    @Size(max = 20)
    @ColumnDefault("' Đang bán'")
    @Column(name = "sale_status", length = 20)
    private String saleStatus;

    public String getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        this.saleStatus = saleStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSalePerson() {
        return salePerson;
    }

    public void setSalePerson(String salePerson) {
        this.salePerson = salePerson;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getTypeOfFood() {
        return typeOfFood;
    }

    public void setTypeOfFood(String typeOfFood) {
        this.typeOfFood = typeOfFood;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }


}