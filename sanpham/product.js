//Hàm lấy và hiển thị sản phẩm dựa trên loại và trạng thái được chọn
// Lấy userName lấy thông tin từ produc gửi vào giỏ hàng

// function fetchAndDisplayProducts(typeOfFish, statusFilter) {
//     const productsContainer = document.querySelector(`#products-${typeOfFish}`);

//     fetch(`http://localhost:8080/ca-koi-nhat/loai_ca/${typeOfFish}`)
//         .then(response => response.json())
//         .then(data => {
//             const products = data;
//             productsContainer.innerHTML = '';

//             // Lọc sản phẩm dựa trên `sale_status` nếu có `statusFilter`
//             const filteredProducts = statusFilter 
//                 ? products.filter(product => product.sale_status.trim() === statusFilter)
//                 : products;

//             filteredProducts.forEach(product => {
//                 const isSold = product.sale_status.trim() === "Đã bán"; 

//                 const productHTML = `
//                     <div class="product_img">
//                         <a href="../chitietsanpham.html?id=${product.id_of_fish}">
//                             <img src="${product.image}" alt="Product Image" />
//                         </a>
//                     </div>
//                     <div class="product_status">
//                         <button class="status_button" 
//                             style="background-color: ${isSold ? 'gray' : ''};" 
//                             ${isSold ? 'disabled' : ''}>
//                             ${product.sale_status}
//                         </button>
//                         <h3>${product.name_of_fish}</h3>
//                     </div>
//                     <div class="product_details">
//                         <p>${product.note}</p>
//                         <div class="price">
//                             <span>Giá mua ngay:</span>
//                             <strong>${product.price} ₫</strong>
//                         </div>
//                         <button id="buyButton-${product.id_of_fish}" 
//                                 class="buy_button"
//                                 style="${isSold ? 'background-color: gray;' : ''}" 
//                                 ${isSold ? 'disabled' : ''}>
//                             ĐẶT HÀNG NGAY
//                         </button>
//                     </div>
//                     <div class="product_meta">
//                         <p>Người bán: <strong>${product.sale_person}</strong></p>
//                         <p>Năm sinh: <strong>${product.dob_of_fish}</strong></p>
//                         <p>Kích thước: <strong>${product.size_of_fish}</strong></p>
//                         <p>Giống: <span>${product.type_of_fish}</span></p>
//                         <p>Nguồn gốc: <a href="#">${product.origin_of_fish}</a></p>
//                     </div>
//                 `;

//                 const productElement = document.createElement('div');
//                 productElement.classList.add('products');
//                 productElement.innerHTML = productHTML;
//                 productsContainer.appendChild(productElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//         });
// }

// Chỉnh lại
// Helper function to get username from cookies
// Helper function to get username from cookies
function getUsernameFromCookies() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'username') {
            return value;
        }
    }
    return null; // Return null if no username found
}

// Hàm lấy và hiển thị sản phẩm dựa trên loại và trạng thái được chọn
function fetchAndDisplayProducts(typeOfFish, statusFilter) {
    const productsContainer = document.querySelector(`#products-${typeOfFish}`);
    // const username = getUsernameFromCookies(); // Get the username

    // if (!username) {
    //     console.error('User not logged in or username not found in cookies.');
    //     return;
    // }

    fetch(`http://localhost:8080/ca-koi-nhat/loai_ca/${typeOfFish}`)
        .then(response => response.json())
        .then(data => {
            const products = data;
            productsContainer.innerHTML = '';

            // Lọc sản phẩm dựa trên `sale_status` nếu có `statusFilter`
            const filteredProducts = statusFilter 
                ? products.filter(product => product.sale_status.trim() === statusFilter)
                : products;

            filteredProducts.forEach(product => {
                const isSold = product.sale_status.trim() === "Đã bán";

                const productHTML = `
                    <div class="product_img">
                        <a href="../chitietsanpham.html?id=${product.id_of_fish}">
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

                // Add event listener to the Buy Now button
                const buyButton = productElement.querySelector(`#buyButton-${product.id_of_fish}`);
        if (!isSold && buyButton) {
            buyButton.addEventListener('click', () => {
                // Kiểm tra giỏ hàng xem sản phẩm đã có chưa
                fetch(`http://localhost:8080/giohang/${username}`)
                    .then(response => response.json())
                    .then(cartData => {
                        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                        const productInCart = cartData.find(item => item.tenSanPham === product.name_of_fish);

                        if (productInCart) {
                            // Nếu sản phẩm đã có trong giỏ hàng, thông báo cho người dùng
                            alert(`Sản phẩm "${product.name_of_fish}" đã có trong giỏ hàng.`);
                            window.location.href = '../../cart.html';
                        } else {
                            // Nếu sản phẩm chưa có trong giỏ hàng, chuẩn bị dữ liệu và gửi yêu cầu POST
                            const cartDataToAdd = {
                                idOfFish: product.id_of_fish,
                                tongCong: product.price,
                                taiKhoanNguoiDung: username,
                                tenSanPham: product.name_of_fish,
                                image: product.image
                            };

                            fetch(`http://localhost:8080/giohang/${username}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(cartDataToAdd)
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Product added to cart successfully:', cartDataToAdd);
                                    alert(`Sản phẩm đã được thêm vào giỏ hàng!`);
                                    // Redirect to cart.html
                                    window.location.href = '../../cart.html';
                                } else {
                                    console.error('Failed to add product to cart');
                                    alert('Thêm sản phẩm vào giỏ hàng thất bại. Vui lòng thử lại.');
                                }
                            })
                            .catch(error => {
                                console.error('Error adding product to cart:', error);
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching cart data:', error);
                    });
            });
        }
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}


// Lắng nghe sự thay đổi của các radio button để cập nhật trạng thái lọc và lưu vào localStorage
document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', handleFilterChange);
});

function handleFilterChange() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    let statusFilter = null;

    // Xác định trạng thái lọc dựa trên radio button và lưu vào localStorage
    if (selectedFilter === 'onsale') statusFilter = "Đang bán";
    else if (selectedFilter === 'offsale') statusFilter = "Đã bán";
    
    // Lưu giá trị của bộ lọc vào localStorage
    localStorage.setItem('selectedFilter', selectedFilter);

    const kindElements = document.querySelectorAll('.kind');
    kindElements.forEach(element => {
        const typeOfFish = element.id.toLowerCase();
        fetchAndDisplayProducts(typeOfFish, statusFilter);
    });
}

// Khởi tạo hiển thị sản phẩm theo trạng thái bộ lọc được lưu trong localStorage hoặc mặc định
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra localStorage để lấy giá trị đã lưu, nếu không có thì dùng giá trị mặc định là "all"
    const savedFilter = localStorage.getItem('selectedFilter') || 'all';
    let statusFilter = null;

    // Cập nhật trạng thái radio button từ localStorage
    document.querySelector(`input[name="filter"][value="${savedFilter}"]`).checked = true;

    // Xác định trạng thái lọc dựa trên giá trị đã lưu
    if (savedFilter === 'onsale') statusFilter = "Đang bán";
    else if (savedFilter === 'offsale') statusFilter = "Đã bán";

    const kindElements = document.querySelectorAll('.kind');
    kindElements.forEach(element => {
        const typeOfFish = element.id.toLowerCase();
        fetchAndDisplayProducts(typeOfFish, statusFilter);
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
        }
    }
});