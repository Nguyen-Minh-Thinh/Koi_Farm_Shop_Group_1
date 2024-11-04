document.addEventListener("DOMContentLoaded", function () {
    // Define the API endpoints
    const orderApiUrl = "http://localhost:8080/api/orders";
    const customerApiUrl ="http://localhost:8080/api/taikhoan/all";
    const productApiUrl ="http://localhost:8080/ca-koi-nhat";
    // Phần tử hiển thị số lượng đơn hàng
    const orderCountElement = document.querySelector(".order-count");
    const customerCountElement = document.querySelector(".customer-count");
    const productCountElement = document.querySelector(".product-count")
    const revenueElement = document.querySelector(".revenue");
    // Fetch dữ liệu đơn hàng và đếm số lượng
    fetch(orderApiUrl)
        .then(response => response.json())
        .then(data => {
            // Đếm số lượng đơn hàng bằng độ dài của mảng
            const orderCount = data.length;
            orderCountElement.textContent = orderCount;
            const totalRevenue = data.reduce((sum, order) => {
                const isDelivered = order.tinhTrangDonHangs.some(
                    status => status.situation.toLowerCase().includes("giao")
                );
                return isDelivered ? sum + order.totalPrice : sum;
            }, 0);

            // Hiển thị tổng doanh thu lên HTML
            revenueElement.textContent = `${totalRevenue.toLocaleString()} VNĐ`;
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu đơn hàng:", error));
    
    fetch(customerApiUrl)
        .then(response => response.json())
        .then(data =>{
            const customerCount = data.length;
            customerCountElement.textContent = customerCount;
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu khách hàng:", error));
    
    fetch(productApiUrl)
        .then(response => response.json())
        .then(data =>{
            const productCount = data.length;
            productCountElement.textContent = productCount;
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu sản phẩm:", error));
    

});
