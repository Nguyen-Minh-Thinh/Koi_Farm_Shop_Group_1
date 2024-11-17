//Hàm lấy và hiển thị sản phẩm dựa trên loại và trạng thái được chọn
function fetchAndDisplayProducts(typeOfFish, statusFilter) {
    const productsContainer = document.querySelector(`#products-${typeOfFish}`);

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
