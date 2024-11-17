// Hàm lấy id từ URL
function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Lấy id của sản phẩm từ URL
const idOfFish = getIdFromURL();

// Hàm gửi GET request đến server và cập nhật thông tin sản phẩm
function fetchProductDetails(id) {
    fetch(`http://localhost:8080/thuc-an-cho-ca/${id}`)
        .then(response => response.json())
        .then(data => {
            // Cập nhật thông tin sản phẩm vào HTML
            document.getElementById("detailProductImage").src = data.image;
            document.getElementById("productName").textContent = data.caption; // Sửa lại ID cho khớp
            document.getElementById("detailProductNote").textContent = data.note;
            document.getElementById("detailProductPrice").textContent = `${data.price} ₫`;
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

            document.getElementById("salePerson").textContent = data.salePerson;
            document.getElementById("brand").textContent = data.brand;
            document.getElementById("typeOfFood").textContent = data.typeOfFood;
            document.getElementById("origin").textContent = data.origin;
            document.getElementById("weight").textContent = data.weight;
            // Cập nhật trạng thái bán hàng
            document.getElementById("detailStatusButton").textContent = data.saleStatus;

            // Gắn sự kiện cho nút "Đặt hàng ngay"
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', () => {
                // Lấy username từ cookie (hoặc sessionStorage nếu cần)
                const username = getCookie('username'); // Hàm này cần được định nghĩa để lấy cookie

                if (username) {
                    // Gửi POST request để thêm sản phẩm vào giỏ hàng
                    fetch(`http://localhost:8080/giohang/${username}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idOfFish: data.id,
                            tenSanPham: data.caption,
                            tongCong: data.price,
                            image: data.image
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            // Chuyển hướng đến cart.html sau khi thêm thành công
                            window.location.href = '../cart.html';
                        } else {
                            console.error('Failed to add to cart');
                        }
                    })
                    .catch(error => {
                        console.error('Error adding product to cart:', error);
                    });
                } else {
                    alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
                }
            });
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
        });
}

// Lấy cookie theo tên
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Gọi hàm fetch để lấy thông tin sản phẩm
if (idOfFish) {
    fetchProductDetails(idOfFish);
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
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
        }
    }
});