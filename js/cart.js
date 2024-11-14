document.addEventListener('DOMContentLoaded', function () {
    const clearButton = document.querySelector('#clear-btn');    
    const cartTableBody = document.querySelector('.displayCart');
    const totalCartElement = document.querySelector('.total-cart');

    // Hàm để lấy giá trị của cookie theo tên
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Hàm để gửi request và lấy dữ liệu giỏ hàng
    function fetchCartData() {
        const username = getCookie('username'); // Lấy username từ cookie
        if (!username) {
            console.error('Không tìm thấy cookie cho user!');
            return;
        }
        
        fetch(`http://localhost:8080/giohang/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayCart(data);
            })
            .catch(error => {
                console.error('Lỗi: ', error);
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
            nameCell.style.width = '20%';
            
            const imageCell = document.createElement('td');
            imageCell.innerHTML = `<img src="${item.image}" alt="${item.tenSanPham}" style="width: 200px; height: 100px;">`;
            imageCell.style.width = '40%';
            
            // const quantityCell = document.createElement('td');
            // quantityCell.textContent = item.soLuong;

            const priceCell = document.createElement('td');
            priceCell.textContent = `${item.tongCong.toLocaleString()} ₫`;


            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.style.color = 'red'; // Style the "x" as desired
            deleteButton.style.fontSize = '30px';
            deleteButton.style.border = 'none';
            deleteButton.style.backgroundColor = 'white';
            deleteButton.addEventListener('click', () => {
                removeItem(item.id_of_fish); // Use item ID for deletion
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

    // Hàm xóa một mục trong giỏ hàng
    function removeItem(itemId) {
        const username = getCookie('username'); 
        fetch('http://localhost:8080/giohang/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                id_of_fish: itemId
            })
        })
        .then(response => {
            if (response.status === 200) {
                fetchCartData(); // Làm mới giỏ hàng
            } else {
                // Xử lý khi có lỗi hoặc mã khác
                console.error('Failed to delete item');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Lắng nghe sự kiện nhấn vào nút "Làm mới"
    clearButton.addEventListener('click', function () {
        const username = getCookie('username'); // Lấy username từ cookie
        if (!username) {
            console.error('Không tìm thấy cookie cho user!');
            return;
        }

        fetch(`http://localhost:8080/giohang/${username}`, {
            method: 'DELETE', // Gửi yêu cầu xóa giỏ hàng
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Giỏ hàng đã được xóa');
                fetchCartData(); // Làm mới giỏ hàng sau khi xóa thành công
            } else if (response.status === 404) {
                console.error('Không tìm thấy giỏ hàng.');
            } else {
                console.error('Lỗi khi xóa giỏ hàng');
            }
        })
        .catch(error => console.error('Lỗi:', error));
    });
    

    // Gọi hàm fetchCartData khi trang được tải
    fetchCartData();
});
