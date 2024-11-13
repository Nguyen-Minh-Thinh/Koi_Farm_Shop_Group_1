// Hàm lấy giá trị từ cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Hàm băm mật khẩu bằng SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); // Mã hóa chuỗi thành dạng bytes
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Tính toán hash SHA-256

    // Chuyển đổi từ buffer sang chuỗi hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

document.getElementById("updateForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi ngay lập tức

    const userName = getCookie("username"); // Lấy userName từ cookie
    const tenKhachHang = document.getElementById("main-username").value; // Sửa ID
    const email = document.getElementById("main-email").value; // Sửa ID
    const password = document.getElementById("userNewPassword").value; // Sửa ID
    const confirmPassword = document.getElementById("main-password").value; // Sửa ID

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
    if (!password || !confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không được để trống.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }

    // Băm mật khẩu trước khi gửi
    const hashedPassword = await hashPassword(password);
    // Gửi yêu cầu cập nhật tài khoản
    fetch(`http://localhost:8080/api/taikhoan/change/${userName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tenKhachHang: tenKhachHang,
            email: email,
            passWord: hashedPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Cập nhật tài khoản thành công!");
            window.location.href = "./caidat.html"
        } else {
            alert("Cập nhật tài khoản thất bại: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    });
});
// document.addEventListener("DOMContentLoaded", function () {
//     const orderTableBody = document.getElementById("order-table-body");

//     // Hàm để lấy dữ liệu đơn hàng từ API
//     async function fetchOrders() {
//         try {
//             const response = await fetch("http://localhost:8080/api/orders");
//             if (!response.ok) {
//                 throw new Error(`Lỗi khi lấy dữ liệu đơn hàng: ${response.status}`);
//             }
//             const orders = await response.json();
//             displayOrders(orders);
//         } catch (error) {
//             console.error("Có lỗi xảy ra:", error);
//             orderTableBody.innerHTML = `<tr><td colspan="6">Không thể tải đơn hàng. Vui lòng thử lại sau.</td></tr>`;
//         }
//     }

//     // Hàm để hiển thị đơn hàng trong bảng
//     function displayOrders(orders) {
//         orderTableBody.innerHTML = ""; // Xóa nội dung cũ
//         orders.forEach(order => {
//             const latestStatus = order.tinhTrangDonHangs.reduce((latest, current) => {
//                 return current.id > latest.id ? current : latest;
//             }, order.tinhTrangDonHangs[0]);

//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${order.id}</td>
//                 <td>${order.deliveryTime}</td>
//                 <td>${order.phoneNumber.tenKhachHang}</td>
//                 <td><span class="status ${latestStatus.situation === 'Đã giao hàng' ? 'delivered' : latestStatus.situation === 'Đã hủy' ? 'canceled' : 'processing'}">${latestStatus.situation}</span></td>
//                 <td>${order.totalPrice.toLocaleString()} ₫</td>
//                 <td>
//                     <button onclick="viewOrderDetails(${order.id})">Xem Chi Tiết</button>
//                     <button onclick="viewStatusHistory(${order.id})">Tình Trạng</button>
//                 </td>
//             `;
//             orderTableBody.appendChild(row);
//         });
//     }

//     // Hàm để xem chi tiết đơn hàng
//     window.viewOrderDetails = function(orderId) {
//         // Logic để xem chi tiết đơn hàng (có thể mở modal hoặc chuyển trang)
//         alert(`Xem chi tiết đơn hàng ID: ${orderId}`);
//         // Bạn có thể mở modal hoặc chuyển đến trang khác để hiển thị chi tiết
//     }

//     // Hàm để xem lịch sử trạng thái đơn hàng
//     window.viewStatusHistory = function(orderId) {
//         // Logic để xem lịch sử trạng thái đơn hàng
//         alert(`Xem lịch sử trạng thái đơn hàng ID: ${orderId}`);
//         // Bạn có thể mở modal hoặc chuyển đến trang khác để hiển thị lịch sử trạng thái
//     }

//     // Gọi hàm để lấy dữ liệu đơn hàng khi trang được tải
//     fetchOrders();
// });

document.addEventListener("DOMContentLoaded", function () {
    const accountLink = document.getElementById("accountLink");
    const ordersLink = document.getElementById("ordersLink");
    const accountSection = document.getElementById("accountSection");
    const ordersSection = document.getElementById("ordersSection");

    // Hiển thị phần "Tài khoản của tôi" và ẩn "Đơn mua" khi trang được tải
    accountSection.style.display = "block";
    ordersSection.style.display = "none";

    // Khi nhấn "Tài khoản của tôi"
    accountLink.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn không cho liên kết làm mới trang
        accountSection.style.display = "block"; // Hiển thị phần tài khoản
        ordersSection.style.display = "none"; // Ẩn phần đơn mua
    });

    // Khi nhấn "Đơn mua"
    ordersLink.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn không cho liên kết làm mới trang
        ordersSection.style.display = "block"; // Hiển thị phần đơn mua
        accountSection.style.display = "none"; // Ẩn phần tài khoản
    });
});
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hàm để lấy giá trị cookie theo tên
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fetch order data from API
async function fetchOrders() {
    try {
        const response = await fetch("http://localhost:8080/api/orders");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error("Error fetching orders: ", error);
    }
}

// Load data when the page is loaded
async function loadData() {
    const orders = await fetchOrders();
    const username = getCookie("username"); // Lấy tên người dùng từ cookie

    if (orders) {
        // Sắp xếp đơn hàng theo order.id giảm dần
        orders.sort((a, b) => b.id - a.id);

        // Lọc đơn hàng theo tên người dùng
        const filteredOrders = orders.filter(order => order.phoneNumber.userName === username);
        populateOrderTable(filteredOrders);  // Hiển thị dữ liệu đơn hàng trong bảng
    }
}

loadData();

// Generate the main order table row dynamically
function generateOrderRow(order) {
    const latestStatus = order.tinhTrangDonHangs.reduce((latest, current) => {
        return current.id > latest.id ? current : latest;
    }, order.tinhTrangDonHangs[0]);
    return `
        <tr>
            <td>${order.id}</td>
            <td>${order.deliveryTime}</td>
            <td>${order.userName}</td>
            <td><span class="status ${latestStatus.situation === 'Đã giao hàng' ? 'delivered' : latestStatus.situation === 'Đã hủy' ? 'canceled' : 'processing'}">${latestStatus.situation}</span></td>
            <td>${order.totalPrice.toLocaleString()} ₫</td>
            <td>
                <button class="btn view-btn" onclick="viewOrderDetails(${order.id})">Xem</button>
                <button class="btn view-btn" onclick="viewStatusHistory(${order.id})">Tình trạng</button>
            </td>
        </tr>
    `;
}

// Populate the main order table with data from API
function populateOrderTable(orders) {
    const tableBody = document.querySelector('.order-table tbody');
    let rows = '';
    orders.forEach(order => {
        rows += generateOrderRow(order);
    });
    tableBody.innerHTML = rows;
}

// Generate order details dynamically
function generateOrderDetails(order) {
    let orderItemsHtml = '';
    order.chitietdonhangs.forEach(detail => {
        orderItemsHtml += `
            <div class="order-item">
                <img src="${detail.idOfFish.image}" alt="${detail.idOfFish.nameOfFish}">
                <div class="order-item-details">
                    <h4>${detail.idOfFish.nameOfFish}</h4>
                    <p><i>${detail.idOfFish.originOfFish}</i></p>
                </div>
            </div>
        `;
    });

    const orderInfoHtml = `
        <div class="order-info">
            <p><strong>Ngày đặt hàng:</strong> ${order.orderDate}</p>
            <p><strong>Hình thức giao:</strong> ${order.pay}</p>
            <p><strong>Số điện thoại:</strong> ${order.phoneNumber.phoneNumber}</p>
            <p><strong>Thời gian giao:</strong> ${order.deliveryTime}</p>
            <p><strong>Địa chỉ nhận:</strong> ${order.address}</p>
        </div>
    `;

    document.getElementById('order-items').innerHTML = orderItemsHtml;
    document.getElementById('order-info-container').innerHTML = orderInfoHtml;
    document.getElementById('total-price').innerText = order.totalPrice.toLocaleString() + ' ₫';
}

// View order details in a modal
function viewOrderDetails(orderId) {
    fetchOrders().then((orders) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            // Hiển thị chi tiết đơn hàng
            generateOrderDetails(order);

            // Mở modal chi tiết đơn hàng
            const orderModal = document.getElementById('orderModal');
            orderModal.style.display = "block";

            // Đóng modal khi nhấn nút "Close"
            const closeBtn = document.getElementsByClassName("closes")[0];
            closeBtn.onclick = function() {
                orderModal.style.display = "none"; // Đóng modal
            };

            // Đóng modal khi nhấn bên ngoài modal
            window.onclick = function(event) {
                if (event.target == orderModal) {
                    orderModal.style.display = "none"; // Đóng modal
                }
            };
        }
    });
}

// View status history in a modal
function viewStatusHistory(orderId) {
    fetchOrders().then((orders) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            // Sắp xếp trạng thái theo id tăng dần
            order.tinhTrangDonHangs.sort((a, b) => a.id - b.id);
    
            const statusTableBody = document.getElementById('status-table-body');
            let statusRowsHtml = '';
    
            order.tinhTrangDonHangs.forEach(status => {
                statusRowsHtml += `
                    <tr>
                        <td>${status.times}</td>
                        <td>${status.situation}</td>
                        <td>${status.statusDetails}</td>
                    </tr>
                `;
            });
    
            statusTableBody.innerHTML = statusRowsHtml;
            statusTableBody.dataset.orderId = order.id;
    
            const statusModal = document.getElementById('statusModal');
            statusModal.style.display = "block";
    
            const closeStatusBtn = document.getElementsByClassName("close-status")[0];
            closeStatusBtn.onclick = function() {
                statusModal.style.display = "none";
            };
    
            window.onclick = function(event) {
                if (event.target == statusModal) {
                    statusModal.style.display = "none";
                }
            };
        }
    });
}

// Gọi hàm loadData khi trang được tải
window.onload = loadData;