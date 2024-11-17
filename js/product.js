// Lấy tất cả các phần tử container sản phẩm có id dạng 'products-{type_of_fish}'
const kindElements = document.querySelectorAll('.kind');

kindElements.forEach(element => {
    const typeOfFish = element.id.toLowerCase();
    const productsContainer = element.querySelector(`#products-${typeOfFish}`);

    fetch(`http://localhost:8080/ca-koi-nhat/loai_ca/${typeOfFish}`)
        .then(response => response.json())
        .then(data => {
            const products = data.slice(0, 4);
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const isSold = product.sale_status === " Đã bán"; // Kiểm tra nếu sản phẩm đã bán

                const productHTML = `
                    <div class="product_img">
                        <a href="chitietsanpham.html?id=${product.id_of_fish}">
                            <img src="${product.image}" alt="Product Image" />
                        </a>
                    </div>
                    <div class="product_status">
                        <button class="status_button" 
                            style="background-color: ${isSold ? 'gray' : ''};" 
                            ${isSold ? 'disabled' : ''}>
                            ${product.sale_status}
                        </button>
                        <h3>${product.name_of_fish}</h3>
                    </div>
                    <div class="product_details">
                        <p>${product.note}</p>
                        <div class="price">
                            <span>Giá mua ngay:</span>
                            <strong>${product.price} ₫</strong>
                        </div>
                        <button id="buyButton-${product.id_of_fish}" 
                                class="buy_button"
                                style="${isSold ? 'background-color: gray;' : ''}" 
                                ${isSold ? 'disabled' : ''}>
                            ĐẶT HÀNG NGAY
                        </button>

                    </div>
                    <div class="product_meta">
                        <p>Người bán: <strong>${product.sale_person}</strong></p>
                        <p>Năm sinh: <strong>${product.dob_of_fish}</strong></p>
                        <p>Kích thước: <strong>${product.size_of_fish}</strong></p>
                        <p>Giống: <span>${product.type_of_fish}</span></p>
                        <p>Nguồn gốc: <a href="#">${product.origin_of_fish}</a></p>
                    </div>
                `;

                const productElement = document.createElement('div');
                productElement.classList.add('products');
                productElement.innerHTML = productHTML;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

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