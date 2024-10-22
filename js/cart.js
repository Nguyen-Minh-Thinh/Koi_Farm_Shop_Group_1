document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('.displayCart');
    const totalCartElement = document.querySelector('.total-cart');

    // Hàm để gửi request và lấy dữ liệu giỏ hàng
    function fetchCartData() {
        fetch('http://localhost:8080/giohang/nguyenminhthinh')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayCart(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Hàm để hiển thị dữ liệu giỏ hàng lên bảng
    function displayCart(cartItems) {
        cartTableBody.innerHTML = ''; // Xóa nội dung cũ
        let total = 0; // Tổng giá

        cartItems.forEach(item => {
            const row = document.createElement('tr');

            // Tạo các cột cho bảng
            const imageCell = document.createElement('td');
            imageCell.innerHTML = `<img src="${item.image}" alt="${item.tenSanPham}" style="width: 100px; height: auto;"><br>${item.tenSanPham}`;
            
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.soLuong;

            const priceCell = document.createElement('td');
            priceCell.textContent = `${item.tongCong.toLocaleString()} ₫`;
            
            const totalCell = document.createElement('td');
            totalCell.textContent = `${item.tongCong.toLocaleString()} ₫`;
            
            // Thêm các cột vào hàng
            row.appendChild(imageCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            row.appendChild(totalCell);

            // Thêm hàng vào bảng
            cartTableBody.appendChild(row);

            // Cộng dồn tổng
            total += item.tongCong;
        });

        // Cập nhật tổng giá
        totalCartElement.textContent = `${total.toLocaleString()} ₫`;
    }

    // Gọi hàm fetchCartData khi trang được tải
    fetchCartData();
});
