// Function to fetch and display fish food products
function fetchAndDisplayFishFood(statusFilter) {
    const productsContainer = document.querySelector(`#products-thuc-an-cho-ca`);

    fetch(`http://localhost:8080/thuc-an-cho-ca`)
        .then(response => response.json())
        .then(data => {
            const products = data;
            productsContainer.innerHTML = '';

            // Filter products based on `statusFilter`
            const filteredProducts = statusFilter 
                ? products.filter(product => product.saleStatus && product.saleStatus.trim() === statusFilter)
                : products;

            filteredProducts.forEach(product => {
                const isSold = product.saleStatus.trim() === "Đã bán"; 
                const productHTML = `
                    <div class="product_img">
                        <a href="../chiTietThucAnChoCa.html?id=${product.id}">
                            <img src="${product.image}" alt="Product Image" />
                        </a>
                    </div>
                    <div class="product_status">
                        <button class="status_button" 
                            style="background-color: ${isSold ? 'gray' : ''};" 
                            ${isSold ? 'disabled' : ''}>
                            ${product.saleStatus}
                        </button>
                        <h3>${product.caption}</h3>
                    </div>
                    <div class="product_details">
                        <p>${product.note}</p>
                        <div class="price">
                            <span>Giá mua ngay:</span>
                            <strong>${product.price} ₫</strong>
                        </div>
                        <button id="buyButton-${product.id}" 
                                class="buy_button"
                                style="${isSold ? 'background-color: gray;' : ''}" 
                                ${isSold ? 'disabled' : ''}>
                            ĐẶT HÀNG NGAY
                        </button>
                    </div>
                    <div class="product_meta">
                        <p>Người bán: <strong>${product.salePerson}</strong></p>
                        <p>Thương hiệu: <strong>${product.brand}</strong></p>
                        <p>Loại thức ăn: <strong>${product.typeOfFood}</strong></p>
                        <p>Xuất xứ: <strong>${product.origin}</strong></p>
                        <p>Trọng lượng: <strong>${product.weight}</strong></p>
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

// Event listeners for filter radio buttons
document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', handleFilterChange);
});

function handleFilterChange() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    let statusFilter = null;

    // Determine filter status based on radio button selection
    if (selectedFilter === 'onsale') statusFilter = "Đang bán";
    else if (selectedFilter === 'offsale') statusFilter = "Đã bán";

    // Save filter to localStorage
    localStorage.setItem('selectedFilter', selectedFilter);

    // Fetch and display products with the selected filter
    fetchAndDisplayFishFood(statusFilter);
}

// Initialize product display based on saved filter or default
document.addEventListener('DOMContentLoaded', () => {
    const savedFilter = localStorage.getItem('selectedFilter') || 'all';
    let statusFilter = null;

    // Update radio button status from localStorage
    document.querySelector(`input[name="filter"][value="${savedFilter}"]`).checked = true;

    // Determine filter status based on saved value
    if (savedFilter === 'onsale') statusFilter = "Đang bán";
    else if (savedFilter === 'offsale') statusFilter = "Đã bán";

    fetchAndDisplayFishFood(statusFilter);
});
