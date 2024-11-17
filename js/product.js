// Lấy tất cả các phần tử container sản phẩm có id dạng 'products-{type_of_fish}'
const kindElements = document.querySelectorAll('.kind');

kindElements.forEach(element => {
    const typeOfFish = element.id.toLowerCase();
    const productsContainer = element.querySelector(`#products-${typeOfFish}`);

    fetch(`http://localhost:8080/ca-koi-nhat/loai_ca/${typeOfFish}`)
        .then(response => response.json())
        .then(data => {
            const products = data.slice(0, 4); // Hiển thị tối đa 4 sản phẩm
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const isSold = product.sale_status.trim() === "Đã bán"; // Kiểm tra nếu sản phẩm đã bán

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

                // Xử lý sự kiện nhấn nút "ĐẶT HÀNG NGAY"
                const buyButton = productElement.querySelector(`#buyButton-${product.id_of_fish}`);
                buyButton.addEventListener('click', () => {
                    const username = getCookie('username'); // Hàm này cần được định nghĩa để lấy cookie

                    if (username) {
                        // Bước 1: Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
                        fetch(`http://localhost:8080/giohang/${username}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to fetch cart items');
                                }
                                return response.json();
                            })
                            .then(cartItems => {
                                const isProductInCart = cartItems.some(item => item.tenSanPham === product.name_of_fish);

                                if (isProductInCart) {
                                    alert('Sản phẩm này đã có trong giỏ hàng!');
                                    window.location.href = '../cart.html'; // Redirect to cart
                                } else {  
                                    // Sản phẩm chưa có trong giỏ hàng, thêm vào
                                    fetch(`http://localhost:8080/giohang/${username}`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            idOfFish: product.id_of_fish,
                                            tenSanPham: product.name_of_fish,
                                            taiKhoanNguoiDung: username,
                                            tongCong: product.price,
                                            image: product.image
                                        })
                                    })
                                    .then(response => {
                                        if (response.ok) {
                                            alert('Sản phẩm đã được thêm vào giỏ hàng!');
                                            window.location.href = '../cart.html'; // Redirect to cart
                                        } else {
                                            console.error('Failed to add to cart');
                                            alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error adding product to cart:', error);
                                        alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
                                    });
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching cart items:', error);
                                alert('Có lỗi xảy ra khi lấy giỏ hàng!');
                            });
                    } else {
                        alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

// Hàm lấy cookie theo tên
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
