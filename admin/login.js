document.addEventListener("DOMContentLoaded", function() {
    const signInButton = document.querySelector(".button");

    // Lắng nghe sự kiện khi người dùng nhấn nút "Sign In"
    signInButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Ngăn không cho form tự động gửi

        // Lấy giá trị từ các trường input
        const userName = document.getElementById("user").value;
        const password = document.getElementById("pass").value;

        // Kiểm tra xem đã nhập đầy đủ thông tin chưa
        if (!userName || !password) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
            return;
        }

        // Tạo object để gửi trong request
        const loginData = {
            userName: userName,
            passWord: password
        };

        try {
            // Gửi yêu cầu POST đến API login
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Đăng nhập thành công!"); // Hoặc chuyển hướng sang trang khác
                console.log(data); // Xử lý dữ liệu từ response nếu cần thiết

                // Ví dụ chuyển hướng sau khi đăng nhập thành công
                window.location.href = "./index.html";
            } else if (response.status === 401) {
                alert("Sai tên đăng nhập hoặc mật khẩu!"); // Hiển thị thông báo khi thông tin sai
            } else {
                alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi kết nối.");
        }
    });

    // Lắng nghe sự kiện khi người dùng nhấn phím Enter
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            signInButton.click(); // Giả lập hành động nhấn nút "Sign In"
        }
    });
});
