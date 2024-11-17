package com.example.back_end.modal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "ca_koi_nhat", schema = "koi_farm_shop")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CaKoiNhat {
    @Id
    @Column(name = "id_of_fish", nullable = false, length = 50)
    private String idOfFish;

    @Column(name = "image")
    private String image;

    @Column(name = "sale_status", length = 50)
    private String saleStatus;

    @Column(name = "name_of_fish", length = 100)
    private String nameOfFish;

    @Lob
    @Column(name = "note")
    private String note;

    @Column(name = "price", length = 50)
    private String price;

    @Column(name = "sale_person", length = 100)
    private String salePerson;

    @Column(name = "sex_of_fish", length = 50)
    private String sexOfFish;

    @Column(name = "dob_of_fish", length = 50)
    private String dobOfFish;

    @Column(name = "size_of_fish", length = 50)
    private String sizeOfFish;

    @Column(name = "origin_of_fish", length = 100)
    private String originOfFish;

    @Column(name = "type_of_fish")
    private String typeOfFish;

    public String getTypeOfFish() {
        return typeOfFish;
    }

    public void setTypeOfFish(String typeOfFish) {
        this.typeOfFish = typeOfFish;
    }

    // Getters and Setters

    public String getIdOfFish() {
        return idOfFish;
    }

    public void setIdOfFish(String idOfFish) {
        this.idOfFish = idOfFish;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        this.saleStatus = saleStatus;
    }

    public String getNameOfFish() {
        return nameOfFish;
    }

    public void setNameOfFish(String nameOfFish) {
        this.nameOfFish = nameOfFish;
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

    public String getSexOfFish() {
        return sexOfFish;
    }

    public void setSexOfFish(String sexOfFish) {
        this.sexOfFish = sexOfFish;
    }

    public String getDobOfFish() {
        return dobOfFish;
    }

    public void setDobOfFish(String dobOfFish) {
        this.dobOfFish = dobOfFish;
    }

    public String getSizeOfFish() {
        return sizeOfFish;
    }

    public void setSizeOfFish(String sizeOfFish) {
        this.sizeOfFish = sizeOfFish;
    }

    public String getOriginOfFish() {
        return originOfFish;
    }

    public void setOriginOfFish(String originOfFish) {
        this.originOfFish = originOfFish;
    }

}