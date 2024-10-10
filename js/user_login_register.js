// Lấy các phần tử HTML
var modal = document.getElementById("loginModal"); // Modal chứa form đăng nhập, đăng ký
var loginBtn = document.getElementById("loginBtn"); // Nút để mở modal
var closeBtn = document.getElementsByClassName("close")[0]; // Nút đóng modal

// // Các form trong modal
var loginForm = document.getElementById("loginForm"); // Form đăng nhập
var registerForm = document.getElementById("registerForm"); // Form đăng ký
var forgotPasswordForm = document.getElementById("forgotPasswordForm"); // Form quên mật khẩu

// // Các liên kết chuyển đổi giữa các form
var showRegisterLink = document.getElementById("showRegister"); // Liên kết để hiển thị form đăng ký
var showLoginLink = document.getElementById("showLogin"); // Liên kết để hiển thị form đăng nhập
var forgotPasswordLink = document.getElementById("forgotPassword"); // Liên kết để hiển thị form quên mật khẩu
var backToLoginLink = document.getElementById("backToLogin"); // Liên kết để quay lại form đăng nhập từ form quên mật khẩu

// Mở modal khi nhấn nút "Đăng nhập/Đăng ký"
loginBtn.onclick = function() {
    modal.style.display = "block"; // Hiển thị modal
}

// Đóng modal khi nhấn nút đóng (X)
closeBtn.onclick = function() {
    modal.style.display = "none"; // Ẩn modal
}

// Ngăn chặn đóng modal khi nhấn chuột bên ngoài modal
// window.onclick = function(event) {
//     if (event.target === modal) {
//         // Không làm gì cả, không đóng modal
//     }
// }

// Hiển thị form đăng ký khi nhấn vào liên kết "Đăng ký"
showRegisterLink.onclick = function() {
    loginForm.style.display = "none"; // Ẩn form đăng nhập
    registerForm.style.display = "block"; // Hiển thị form đăng ký
}

//Hiển thị form đăng nhập khi nhấn vào liên kết "Đăng nhập" từ form đăng ký
showLoginLink.onclick = function() {
    registerForm.style.display = "none"; // Ẩn form đăng ký
    loginForm.style.display = "block"; // Hiển thị form đăng nhập
}

// Hiển thị form quên mật khẩu khi nhấn vào liên kết "Quên mật khẩu?"
forgotPasswordLink.onclick = function() {
    loginForm.style.display = "none"; // Ẩn form đăng nhập
    forgotPasswordForm.style.display = "block"; // Hiển thị form quên mật khẩu
}

// Quay lại form đăng nhập từ form quên mật khẩu
backToLoginLink.onclick = function() {
    forgotPasswordForm.style.display = "none"; // Ẩn form quên mật khẩu
    loginForm.style.display = "block"; // Hiển thị lại form đăng nhập
}

// Gửi thông tin đăng nhập khi nhấn nút đăng nhập hoặc Enter
document.addEventListener("DOMContentLoaded", function() {
    const signInButton = document.querySelector(".button");

    // Lắng nghe sự kiện khi người dùng nhấn nút "Sign In"
    signInButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Ngăn không cho form tự động gửi

        // Lấy giá trị từ các trường input
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

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
            const response = await fetch("http://localhost:8080/user/login", {
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

                // Chuyển hướng sau khi đăng nhập thành công
                window.location.href = "./admin/index.html";
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

// Function to check if username exists as user types
document.getElementById('reg_username').addEventListener('input', function () {
    const username = this.value;
    console.log(username);

    // Chỉ kiểm tra nếu tên đăng nhập không rỗng
    if (username) {
        // Gửi yêu cầu kiểm tra tên đăng nhập có tồn tại không
        fetch('http://localhost:8080/user/register/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username }),
        })
        .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
        .then(data => {
            const exists = data.exists; // Lấy giá trị exists từ phản hồi

            // Lấy thông báo lỗi
            const errorMessage = document.getElementById('error-message-1');

            // Xóa thông báo trước nếu có
            errorMessage.style.display = 'none'; // Ẩn thông báo lỗi

            if (exists) {
                // Hiển thị thông báo nếu tên đăng nhập đã tồn tại
                errorMessage.textContent = '*Tên đăng nhập đã tồn tại.';
                errorMessage.style.display = 'block'; // Hiện thông báo lỗi
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Kiểm tra mật khẩu khớp ngay khi người dùng nhập vào ô xác nhận mật khẩu
document.getElementById('confirm_password').addEventListener('input', function () {
    const password = document.getElementById('reg_password').value;
    const confirmPassword = this.value;

    // Lấy thông báo lỗi
    const errorMessage_2 = document.getElementById('error-message-2');
    errorMessage_2.style.display = 'none'; // Ẩn thông báo trước đó

    // Kiểm tra xem mật khẩu có khớp không
    if (confirmPassword && password !== confirmPassword) {
        errorMessage_2.textContent = '*Mật khẩu xác nhận không khớp.';
        errorMessage_2.style.display = 'block'; // Hiện thông báo lỗi
    }
});

// Thêm sự kiện cho nút đăng ký
document.querySelector('#registerForm form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy thông tin từ các trường nhập liệu
    const username = document.getElementById('reg_username').value;
    const password = document.getElementById('reg_password').value;
    const email = document.getElementById('email').value || null; // Nếu không có thì gán là null
    const phoneNumber = document.getElementById('phone').value || null; // Nếu không có thì gán là null

    // Lấy thông báo lỗi
    const errorMessage_1 = document.getElementById('error-message-1');
    const errorMessage_2 = document.getElementById('error-message-2');

    // Kiểm tra nếu có thông báo lỗi nào đang hiển thị
    if (errorMessage_1.style.display === 'block' || errorMessage_2.style.display === 'block') {
        return; // Ngừng lại nếu có thông báo lỗi
    }

    // Gửi yêu cầu đăng ký trực tiếp
    fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: username,
            passWord: password,
            email: email,
            phoneNumber: phoneNumber
        }),
    })
    .then(response => {
        if (response.ok) {
            alert("Đăng ký thành công!");
            // Chuyển hướng đến trang ...
            window.location.href = 'admin/index.html';
        } else {
            throw new Error('Đăng ký không thành công.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});





// Test
// const usernameInput = document.getElementById('reg_username'); // Giả sử bạn có một input với id là 'username'

// usernameInput.addEventListener('input', function() {
//     const username = this.value;
//     console.log(username); // In ra giá trị của username
// });

