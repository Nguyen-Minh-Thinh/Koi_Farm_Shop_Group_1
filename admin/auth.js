// Hàm để lấy giá trị cookie theo tên
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const userName = getCookie("username");
    if (!userName) {
        // Nếu không có tên người dùng trong cookie, chuyển hướng đến trang đăng nhập
        window.location.href = "login.html"; // Đường dẫn đến trang đăng nhập
    }
}

// Gọi hàm kiểm tra trạng thái đăng nhập khi trang được tải
document.addEventListener("DOMContentLoaded", checkLoginStatus);