package com.example.back_end.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class ChitietdonhangId implements java.io.Serializable {
    private static final long serialVersionUID = 1347685089030032968L;
    @NotNull
    @Column(name = "don_hang_id", nullable = false)
    private Integer donHangId;

    @Size(max = 50)
    @NotNull
    @Column(name = "id_of_fish", nullable = false, length = 50)
    private String idOfFish;

    public Integer getDonHangId() {
        return donHangId;
    }

    public void setDonHangId(Integer donHangId) {
        this.donHangId = donHangId;
    }

    public String getIdOfFish() {
        return idOfFish;
    }

    public void setIdOfFish(String idOfFish) {
        this.idOfFish = idOfFish;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ChitietdonhangId entity = (ChitietdonhangId) o;
        return Objects.equals(this.donHangId, entity.donHangId) &&
                Objects.equals(this.idOfFish, entity.idOfFish);
    }

    @Override
    public int hashCode() {
        return Objects.hash(donHangId, idOfFish);
    }

}