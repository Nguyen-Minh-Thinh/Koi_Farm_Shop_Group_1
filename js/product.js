// Lấy tất cả các phần tử container sản phẩm có id dạng 'products-{type_of_fish}'
const kindElements = document.querySelectorAll('.kind');

// Duyệt qua tất cả các loại cá (container) để lấy sản phẩm của mỗi loại cá
kindElements.forEach(element => {
    const typeOfFish = element.id.toLowerCase(); // Lấy type_of_fish từ id của phần tử (vd: 'kohaku')
    const productsContainer = element.querySelector(`#products-${typeOfFish}`); // Tìm container sản phẩm của loại cá

    // Gọi API để lấy sản phẩm của loại cá này
    fetch(`http://localhost:8080/ca-koi-nhat/loai_ca/${typeOfFish}`)
        .then(response => response.json())
        .then(data => {
            // Chỉ lấy 4 sản phẩm đầu tiên
            const products = data.slice(0, 4);
            
            // Xóa nội dung cũ (nếu có) trong container sản phẩm
            productsContainer.innerHTML = '';

            // Duyệt qua các sản phẩm và hiển thị chúng
            products.forEach(product => {
                const isSold = product.sale_status === " Đã bán"; // Kiểm tra nếu sản phẩm đã bán

                const productHTML = `
                    <div class="product_img">
                        <img src="${product.image}" alt="Product Image" />
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
                        <p>Nguồn gốc: <a id="originOfFish" href="#">${product.origin_of_fish}</a></p>
                    </div>
                `;

                // Tạo phần tử div cho mỗi sản phẩm và thêm vào container
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
