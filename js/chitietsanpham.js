// Hàm lấy id từ URL
function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Lấy id của sản phẩm từ URL
const idOfFish = getIdFromURL();

// Gọi API để lấy thông tin chi tiết của sản phẩm
if (idOfFish) {
    fetch(`http://localhost:8080/ca-koi-nhat/${idOfFish}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("detailProductImage").src = data.image;
            document.getElementById("detailProductName").innerText = data.nameOfFish;
            document.getElementById("detailProductNote").innerText = data.note;
            document.getElementById("detailProductPrice").innerText = `${data.price} ₫`;
            document.getElementById("detailStatusButton").innerText = data.saleStatus;
            document.getElementById("detailSalePerson").innerText = data.salePerson;
            document.getElementById("detailDobOfFish").innerText = data.dobOfFish;
            document.getElementById("detailSexOfFish").innerText = data.sexOfFish;
            document.getElementById("detailSizeOfFish").innerText = data.sizeOfFish;
            document.getElementById("detailTypeOfFish").innerText = data.typeOfFish;
            document.getElementById("detailOriginOfFish").innerText = data.originOfFish;

            // Lấy và hiển thị video nếu có
            const videoUrl = `http://localhost:8080/api/loaica/${data.typeOfFish}`;
            if (data.typeOfFish) {
                // Gửi request để lấy thông tin video từ API
                fetch(videoUrl)
                    .then(response => response.json())
                    .then(videoData => {
                        if (videoData.video) {
                            // Gán URL video vào thẻ <iframe>
                            const videoFrame = document.getElementById("videoFrame");
                            
                            // Gán trực tiếp URL video từ videoData
                            videoFrame.src = videoData.video;

                            // Hiển thị video
                            videoFrame.style.display = "block";
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching video:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
} else {
    console.error('No product ID found in URL');
}
