// Hàm để lấy giá trị cookie theo tên
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Hàm kiểm tra tài khoản người dùng
function checkAccount(userName) {
    const apiUrl = `http://localhost:8080/api/taikhoan/${userName}`;

    // Gửi yêu cầu GET tới API
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            console.log("Tài khoản hợp lệ!");
            // Nếu tài khoản hợp lệ, không làm gì (tiếp tục truy cập trang)
        } else {
            console.log("Tài khoản không hợp lệ, chuyển hướng về homepage.");
            window.location.href = "homepage.html";  // Chuyển hướng về trang homepage nếu không hợp lệ
        }
    })
    .catch(error => {
        console.error("Lỗi khi kiểm tra tài khoản:", error);
        window.location.href = "homepage.html";  // Nếu có lỗi, chuyển hướng về trang homepage
    });
}

// Hàm kiểm tra cookie và xác minh tài khoản
function checkCookieAndAccount() {
    // Lấy giá trị cookie "username"
    const userName = getCookie("username");

    // Kiểm tra nếu cookie "username" có tồn tại
    if (userName) {
        console.log("Cookie hợp lệ, kiểm tra tài khoản người dùng.");
        checkAccount(userName);  // Gọi hàm kiểm tra tài khoản
    } else {
        console.log("Không tìm thấy cookie 'username', chuyển hướng về homepage.");
        window.location.href = "homepage.html";  // Chuyển hướng về trang homepage nếu cookie không tồn tại
    }
}

// Gọi hàm khi trang được tải
checkCookieAndAccount();
