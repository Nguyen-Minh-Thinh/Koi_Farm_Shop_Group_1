// Hàm lấy giá trị từ cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

document.getElementById("updateForm").addEventListener("submit", function(event) {
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

    // Gửi yêu cầu cập nhật tài khoản
    fetch(`http://localhost:8080/api/taikhoan/change/${userName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tenKhachHang: tenKhachHang,
            email: email,
            passWord: password
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
