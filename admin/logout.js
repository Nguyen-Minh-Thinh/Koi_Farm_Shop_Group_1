document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.querySelector(".sidebar-menu li a[href='#']"); // Chọn nút Đăng xuất

    // Lắng nghe sự kiện khi người dùng nhấn nút "Đăng xuất"
    logoutButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Ngăn không cho liên kết làm mới trang

        try {
            // Gửi yêu cầu POST đến API logout
            const response = await fetch("http://localhost:8080/user/logout", {
                method: "POST",
                credentials: "include" // Thêm dòng này nếu cần thiết
            });

            if (response.ok) {
                alert("Đăng xuất thành công!");
                // Xóa cookie username
                document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Xóa cookie
                window.location.href = "./login.html"; // Chuyển hướng về trang đăng nhập
            } else {
                alert("Đã xảy ra lỗi khi đăng xuất.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi kết nối khi đăng xuất." + error.message);
        }
    });
});