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
            const nameCell = document.createElement('td');
            nameCell.textContent = item.tenSanPham;
            
            const imageCell = document.createElement('td');
            imageCell.innerHTML = `<img src="${item.image}" alt="${item.tenSanPham}" style="width: 100px; height: auto;">`;
            
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.soLuong;

            const priceCell = document.createElement('td');
            priceCell.textContent = `${item.tongCong.toLocaleString()} ₫`;


            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.style.color = 'red'; // Style the "x" as desired
            deleteButton.style.fontSize = '30px';
            deleteButton.style.border = '0';
            deleteButton.style.backgroundColor = 'white';
            deleteButton.addEventListener('click', () => {
                removeItem(item.id); // Use item ID for deletion
            });
            deleteCell.appendChild(deleteButton);
            
            // Thêm các cột vào hàng
            row.appendChild(nameCell);
            row.appendChild(imageCell);
            row.appendChild(priceCell);
            row.appendChild(deleteCell);


            // Thêm hàng vào bảng
            cartTableBody.appendChild(row);


            // Cộng dồn tổng
            total += item.tongCong;
        });

        // Cập nhật tổng giá
        totalCartElement.textContent = `${total.toLocaleString()} ₫`;
    }


    function removeItem(itemId) {
        fetch('http://localhost:8080/giohang/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Refresh cart data after deletion
                fetchCartData();
            } else {
                console.error('Failed to delete item:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }


    // Gọi hàm fetchCartData khi trang được tải
    fetchCartData();
});
