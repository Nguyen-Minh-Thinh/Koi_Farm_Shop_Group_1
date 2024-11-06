// Tính toán thời gian giao hàng dựa trên thời gian hiện tại + 2 ngày
function calculateDeliveryTime() {
    const now = new Date();
    now.setDate(now.getDate() + 2); // Thêm 2 ngày
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0
    const year = now.getFullYear();

    return `${day}-${month}-${year}`;
}

// Hiển thị thời gian giao hàng
document.getElementById('deliveryTime').value = calculateDeliveryTime();

// Xử lý sự kiện thanh toán
function submitPayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const promoCode = document.getElementById('promoCode').value;
    const totalAmount = document.getElementById('totalAmount').value;

    // Kiểm tra các trường bắt buộc
    if (!name || !address || !paymentMethod || !totalAmount) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    // Hiển thị thông tin thanh toán (có thể gửi dữ liệu tới server để xử lý thêm)
    alert(`Thanh toán thành công!
Tên khách hàng: ${name}
Địa chỉ: ${address}
Thời gian giao hàng: ${deliveryTime}
Phương thức thanh toán: ${paymentMethod}
Mã khuyến mãi: ${promoCode || "Không có"}
Tổng tiền: ${totalAmount} VND`);
}
