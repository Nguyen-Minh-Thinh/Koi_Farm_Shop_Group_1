// Giả sử bạn đã có danh sách sản phẩm đã tải từ trước
let allProducts = {}; // Đối tượng lưu trữ sản phẩm cho từng loại cá

// Hàm này giả định được gọi khi bạn lấy dữ liệu sản phẩm ban đầu từ API
function initializeProducts(typeOfFish, data) {
    allProducts[typeOfFish] = data; // Lưu sản phẩm của từng loại cá vào đối tượng allProducts
    displayProducts(data, document.querySelector(`#products-${typeOfFish}`), 'all');
}

// Hàm để hiển thị sản phẩm dựa trên trạng thái đã chọn
function displayProducts(data, productsContainer, status) {
    productsContainer.innerHTML = ''; // Xóa nội dung cũ

    // Lọc sản phẩm theo trạng thái nếu được yêu cầu
    const filteredProducts = status === 'all' ? data : data.filter(product => product.sale_status === status);

    filteredProducts.forEach(product => {
        const productHTML = `
            <div class="product_img">
                <img src="${product.image}" alt="Product Image" />
            </div>
            <div class="product_status">
                <button class="status_button" style="background-color: ${product.sale_status === ' Đã bán' ? 'gray' : 'red'};">${product.sale_status}</button>
                <h3>${product.name_of_fish}</h3>
            </div>
            <div class="product_details">
                <p>${product.note}</p>
                <div class="price">
                    <span>Giá mua ngay:</span>
                    <strong>${product.price} ₫</strong>
                </div>
                <button id="buyButton-${product.id_of_fish}" class="buy_button" ${product.sale_status === ' Đã bán' ? 'disabled style="background-color: gray;"' : ''}>ĐẶT HÀNG NGAY</button>
            </div>
            <div class="product_meta">
                <p>Người bán: <strong>${product.sale_person}</strong></p>
                <p>Năm sinh: <strong>${product.dob_of_fish}</strong></p>
                <p>Kích thước: <strong>${product.size_of_fish}</strong></p>
                <p>Giống: <span>${product.type_of_fish}</span></p>
                <p>Nguồn gốc: <a id="originOfFish" href="#">${product.origin_of_fish}</a></p>
            </div>
        `;

        const productElement = document.createElement('div');
        productElement.classList.add('products');
        productElement.innerHTML = productHTML;
        productsContainer.appendChild(productElement);
    });
}

// Lắng nghe sự kiện thay đổi trên bộ lọc
const statusFilter = document.getElementById('statusFilter');
statusFilter.addEventListener('change', (event) => {
    const selectedStatus = event.target.value; // Lấy trạng thái được chọn trong dropdown

    // Duyệt qua tất cả các loại cá và cập nhật hiển thị sản phẩm dựa trên bộ lọc
    kindElements.forEach(element => {
        const typeOfFish = element.id.toLowerCase();
        const productsContainer = element.querySelector(`#products-${typeOfFish}`);

        // Lấy dữ liệu sản phẩm từ allProducts và lọc theo trạng thái
        const data = allProducts[typeOfFish];
        if (data) {
            displayProducts(data, productsContainer, selectedStatus); // Hiển thị sản phẩm theo trạng thái lọc
        }
    });
});
