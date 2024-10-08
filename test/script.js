const fishData = [
    {
        "idOfFish": "034",
        "image": "https://onkoi.vn/wp-content/uploads/2020/06/tan-cho-70cm-2016-600x600.jpg",
        "saleStatus": "Đã bán, Đang bán",
        "nameOfFish": "Koi Tancho 70 cm 4 năm tuổi",
        "note": "Em koi Tancho 70 cm 4 tuổi nổi bật với là da Shiro trắng muốn, điểm Hi đỏ chót trên đầu, tròn vành vạnh như mặt trời mọc.",
        "price": "Liên hệ",
        "salePerson": "OnKoi Quang Minh",
        "sexOfFish": "Koi Cái",
        "dobOfFish": "2016",
        "sizeOfFish": "70 cm",
        "originOfFish": "Dainichi Koi Farm",
        "typeOfFish": {
            "typeOfFish": "Tancho",
            "image": "https://onkoi.vn/wp-content/uploads/2021/01/8.jpg",
            "video": "https://www.youtube.com/embed/30Z0hSO3at8?rel=0&autoplay=1&mute=1"
        }
    },
    {
        "idOfFish": "035",
        "image": "https://onkoi.vn/wp-content/uploads/2020/06/Doitsu-Tancho-Sanke-54-cm-2018-600x600.jpg",
        "saleStatus": "Đang bán",
        "nameOfFish": "Koi Showa 80 cm 5 năm tuổi",
        "note": "Koi Showa 80 cm 5 tuổi nổi bật với những màu sắc rực rỡ và hình dáng hoàn hảo.",
        "price": "Liên hệ",
        "salePerson": "OnKoi Quang Minh",
        "sexOfFish": "Koi Đực",
        "dobOfFish": "2018",
        "sizeOfFish": "80 cm",
        "originOfFish": "Dainichi Koi Farm",
        "typeOfFish": {
            "typeOfFish": "Showa",
            "image": "https://onkoi.vn/wp-content/uploads/2021/01/8.jpg",
            "video": "https://www.youtube.com/embed/30Z0hSO3at8?rel=0&autoplay=1&mute=1"
        }
    }
    // Bạn có thể thêm nhiều sản phẩm khác ở đây
];

// Hàm để tạo card sản phẩm
function createFishCard(fish) {
    const fishCard = document.createElement('div');
    fishCard.className = 'fish-card';

    fishCard.innerHTML = `
        <img src="${fish.image}" alt="${fish.nameOfFish}">
        <h3>${fish.nameOfFish}</h3>
        <p><strong>Giá:</strong> ${fish.price}</p>
        <p><strong>Trạng thái:</strong> ${fish.saleStatus}</p>
        <p>${fish.note}</p>
        <p><strong>Người bán:</strong> ${fish.salePerson}</p>
        <p><strong>Giới tính:</strong> ${fish.sexOfFish}</p>
        <p><strong>Kích thước:</strong> ${fish.sizeOfFish}</p>
        <p><strong>Nơi sản xuất:</strong> ${fish.originOfFish}</p>
        <p><strong>Loại cá:</strong> ${fish.typeOfFish.typeOfFish}</p>
        <a href="${fish.typeOfFish.video}" target="_blank">Xem video</a>
    `;

    return fishCard;
}

// Hiển thị cá trong container
const fishContainer = document.getElementById('fish-container');

// Lặp qua từng sản phẩm và tạo card cho chúng
fishData.forEach(fish => {
    const fishCard = createFishCard(fish);
    fishContainer.appendChild(fishCard);
});
