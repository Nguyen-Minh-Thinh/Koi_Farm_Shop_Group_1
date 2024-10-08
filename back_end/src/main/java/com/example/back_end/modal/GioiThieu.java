package com.example.back_end.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "gioi_thieu")
public class GioiThieu {
    @Id
    @Column(name = "type_of_fish", nullable = false)
    private String typeOfFish;

    @Column(name = "image")
    private String image;

    @Column(name = "video")
    private String video;

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