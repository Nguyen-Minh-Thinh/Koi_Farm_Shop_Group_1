fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('product-container');

    products.forEach(product => {
      const productHTML = `
        <div class="products shop-item">
          <div class="product_img">
              <img class="product_img" src="${product.image}" alt="${product.name}">
          </div>
          <div class="product_status">
              <button class="status_button">${product.status}</button>
              <div class="shop-item-title">
                  <h3>${product.name}</h3>
              </div>
          </div>
          <div class="product_details">
              <p>${product.description}</p>
              <span>Giá mua ngay:</span>
              <span class="price">${product.price.toLocaleString()} ₫</span>
              <button class="purchase_button">ĐẶT HÀNG NGAY</button>
          </div>
        </div>
      `;
      container.innerHTML += productHTML;
    });
  })
  .catch(error => console.error('Lỗi khi gọi API:', error));
