package com.example.back_end.modal;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "loai_ca")
public class Loaica {
    @Id
    @Column(name = "type_of_fish", nullable = false)
    private String typeOfFish;

    @Column(name = "image")
    private String image;

    @Column(name = "video")
    private String video;

//    @OneToMany(mappedBy = "typeOfFish")
//    private Set<CaKoiNhat> caKoiNhats = new LinkedHashSet<>();



    public String getTypeOfFish() {
        return typeOfFish;
    }

    public void setTypeOfFish(String typeOfFish) {
        this.typeOfFish = typeOfFish;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

}