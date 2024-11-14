// Function to fetch and display fish food products based on the selected type and status
function fetchAndDisplayFishFood(typeOfFood, statusFilter) {
    const productsContainer = document.querySelector(`#products-${typeOfFood}`);

    fetch(`http://localhost:8080/fish-food/type/${typeOfFood}`)
        .then(response => response.json())
        .then(data => {
            const products = data;
            productsContainer.innerHTML = '';

            // Filter products based on `statusFilter`
            const filteredProducts = statusFilter 
                ? products.filter(product => product.sale_status.trim() === statusFilter)
                : products;

            filteredProducts.forEach(product => {
                const productHTML = `
                    <div class="product_img">
                        <a href="../chitietsanpham.html?id=${product.id}">
                            <img src="${product.image}" alt="Product Image" />
                        </a>
                    </div>
                    <div class="product_status">
                        <button class="status_button" 
                            style="background-color: ${isSold ? 'gray' : ''};" 
                            ${isSold ? 'disabled' : ''}>
                            ${product.sale_status}
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
                        <p>Người bán: <strong>${product.sale_person}</strong></p>
                        <p>Thương hiệu: <strong>${product.brand}</strong></p>
                        <p>Loại thức ăn: <span>${product.type_of_food}</span></p>
                        <p>Xuất xứ: <a href="#">${product.origin}</a></p>
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

// Event listener for radio button filter change
document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', handleFilterChange);
});

function handleFilterChange() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    let statusFilter = null;

    // Set the filter status based on selected radio button and save it to localStorage
    if (selectedFilter === 'onsale') statusFilter = "Đang bán";
    else if (selectedFilter === 'offsale') statusFilter = "Đã bán";
    
    // Save the filter value to localStorage
    localStorage.setItem('selectedFilter', selectedFilter);

    const kindElements = document.querySelectorAll('.kind');
    kindElements.forEach(element => {
        const typeOfFood = element.id.toLowerCase();
        fetchAndDisplayFishFood(typeOfFood, statusFilter);
    });
}

// Initialize display of products based on saved filter status or default
document.addEventListener('DOMContentLoaded', () => {
    const savedFilter = localStorage.getItem('selectedFilter') || 'all';
    let statusFilter = null;

    // Update radio button state from localStorage
    document.querySelector(`input[name="filter"][value="${savedFilter}"]`).checked = true;

    // Set the filter status based on saved value
    if (savedFilter === 'onsale') statusFilter = "Đang bán";
    else if (savedFilter === 'offsale') statusFilter = "Đã bán";

    const kindElements = document.querySelectorAll('.kind');
    kindElements.forEach(element => {
        const typeOfFood = element.id.toLowerCase();
        fetchAndDisplayFishFood(typeOfFood, statusFilter);
    });
});
