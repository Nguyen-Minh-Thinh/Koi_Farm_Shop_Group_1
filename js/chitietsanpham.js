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
            const statusButton = document.getElementById("detailStatusButton");
            statusButton.innerText = data.saleStatus;

            // Kiểm tra nếu trạng thái là "đã bán"
            if (data.saleStatus === " Đã bán") {
                statusButton.disabled = true;
                statusButton.style.backgroundColor = "gray";

                // Cập nhật trạng thái và màu sắc cho buyButton
                const buyButton = document.getElementById("buyButton");
                buyButton.disabled = true;
                buyButton.style.backgroundColor = "gray";
            }
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Hàm hiển thị modal đăng nhập
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
}

// Hàm ẩn modal đăng nhập
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy_button')) {
        const isLoggedIn = getCookie("username"); // Kiểm tra cookie đăng nhập

        if (!isLoggedIn) {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            showLoginModal(); // Hiển thị modal đăng nhập
        } else {
            // Tiến hành đặt hàng nếu đã đăng nhập
            alert('Đặt hàng thành công!');
        }
    }
});