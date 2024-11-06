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
document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.querySelector(".button");
    const loginBtn = document.getElementById("loginBtn"); // Lấy phần tử Đăng nhập/Đăng ký
    const userNameSpan = document.getElementById("userName"); // Lấy phần tử hiển thị tên người dùng
    const settingsLink = document.getElementById("settingsLink"); // Lấy phần tử Cài đặt
    const logoutLink = document.getElementById("logoutLink"); // Lấy phần tử Đăng xuất
    const shoppingCart = document.getElementById("shoppingCart");

    // Hàm để lấy giá trị cookie theo tên
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Kiểm tra trạng thái đăng nhập khi trang được tải
    function checkLoginStatus() {
        const userName = getCookie("username");
        if (userName) {
            // Gửi yêu cầu GET đến server để lấy thông tin tài khoản
            fetch(`http://localhost:8080/api/taikhoan/${userName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    // Kiểm tra nếu "tenKhachHang" có giá trị khác null
                    if (data.tenKhachHang !== "") {
                        userNameSpan.textContent = data.tenKhachHang;
                    } else {
                        userNameSpan.textContent = data.userName;
                    }
                    
                    // Cập nhật giao diện nếu người dùng đã đăng nhập
                    loginBtn.style.display = "none"; // Ẩn nút Đăng nhập/Đăng ký
                    userNameSpan.style.display = "inline"; // Hiện tên người dùng
                    settingsLink.style.display = "inline"; // Hiện link Cài đặt
                    logoutLink.style.display = "inline"; // Hiện link Đăng xuất
                    shoppingCart.style.display = "inline-block"; // Hiện giỏ hàng
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                    // Nếu có lỗi, giữ nguyên trạng thái đăng nhập/đăng ký
                    loginBtn.style.display = "inline";
                    userNameSpan.style.display = "none";
                    settingsLink.style.display = "none";
                    logoutLink.style.display = "none";
                    shoppingCart.style.display = "none";
                });
        } else {
            // Nếu không có tên người dùng, giữ nguyên trạng thái đăng nhập/đăng ký
            loginBtn.style.display = "inline"; // Hiện nút Đăng nhập/Đăng ký
            userNameSpan.style.display = "none"; // Ẩn tên người dùng
            settingsLink.style.display = "none"; // Ẩn link Cài đặt
            logoutLink.style.display = "none"; // Ẩn link Đăng xuất
            shoppingCart.style.display = "none"; // Ẩn giỏ hàng
        }
    }

    // Gọi hàm kiểm tra trạng thái đăng nhập
    checkLoginStatus();

    // Lắng nghe sự kiện khi người dùng nhấn nút "Sign In"
    signInButton.addEventListener("click", async function (event) {
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
                credentials: "include" // Thêm dòng này nếu cần thiết
            });

            if (response.ok) {
                const data = await response.json();
                alert("Đăng nhập thành công!");
                console.log(data); // Xử lý dữ liệu từ response nếu cần thiết

                // Cập nhật nội dung phần tử Đăng nhập/Đăng ký thành tên người dùng
                // loginBtn.textContent = userName; // Thay đổi nội dung phần tử
                // loginBtn.href = "#"; // Cập nhật href nếu cần

                // Hiển thị các liên kết Cài đặt và Đăng xuất
                // settingsLink.style.display = "inline"; // Hiện link Cài đặt
                // logoutLink.style.display = "inline"; // Hiện link Đăng xuất
                
                // Lưu thông tin người dùng vào cookie
                document.cookie = `username=${userName}; path=/`; // Lưu cookie

                // Đóng form đăng nhập
                const loginModal = document.getElementById("loginModal"); // Giả sử form có id là "loginModal"
                if (loginModal) {
                    loginModal.style.display = "none"; // Ẩn form
                }

                // Kiểm tra lại trạng thái đăng nhập (không cần, nhưng có thể hữu ích)
                checkLoginStatus(); 

            } else if (response.status === 401) {
                alert("Sai tên đăng nhập hoặc mật khẩu!");
            } else {
                alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi kết nối." + error.message);
        }
    });

    // Lắng nghe sự kiện khi người dùng nhấn Đăng xuất
    logoutLink.addEventListener("click", async function (event) {
        event.preventDefault(); // Ngăn không cho liên kết làm mới trang

        try {
            // Gửi yêu cầu POST đến API logout
            const response = await fetch("http://localhost:8080/user/logout", {
                method: "POST",
                credentials: "include" // Thêm dòng này nếu cần thiết
            });

            if (response.ok) {
                alert("Đăng xuất thành công!");
                // Reset giao diện về trạng thái chưa đăng nhập
                loginBtn.style.display = "inline"; // Hiện nút Đăng nhập/Đăng ký
                userNameSpan.style.display = "none"; // Ẩn tên người dùng
                settingsLink.style.display = "none"; // Ẩn link Cài đặt
                logoutLink.style.display = "none"; // Ẩn link Đăng xuất
                shoppingCart.style.display = "none"; // Ẩn giỏ hàng

                // Xóa cookie username
                document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Xóa cookie
                window.location.href = "./homepage.html";
            } else {
                alert("Đã xảy ra lỗi khi đăng xuất.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi kết nối khi đăng xuất." + error.message);
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
        fetch('http://localhost:8080/user/register/user-name', {
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
            window.location.href = 'homepage.html';
        } else {
            throw new Error('Đăng ký không thành công.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to check if username exists as user types in forgot password
document.getElementById('forgot_user_name').addEventListener('input', function () {
    // Lấy thông báo lỗi
    const errorMessage = document.getElementById('error-message-3');
    const username = this.value;
    console.log(username);
    errorMessage.style.display = 'none';
    // Chỉ kiểm tra nếu tên đăng nhập không rỗng
    if (username) {
        // Gửi yêu cầu kiểm tra tên đăng nhập có tồn tại không
        fetch('http://localhost:8080/user/register/user-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username }),
        })
        .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
        .then(data => {
            const exists = data.exists; // Lấy giá trị exists từ phản hồi

            

            // Xóa thông báo trước nếu có
            errorMessage.style.display = 'none'; // Ẩn thông báo lỗi

            if (!exists) {
                // Hiển thị thông báo nếu tên đăng nhập đã tồn tại
                errorMessage.textContent = '*Tên đăng nhập không tồn tại.';
                errorMessage.style.display = 'block'; // Hiện thông báo lỗi
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});


// Function to check if email exists as user types in forgot password
document.getElementById('forgot_email').addEventListener('input', function () {
    const errorMessage_1 = document.getElementById('error-message-3');
    const userName = document.getElementById('forgot_user_name').value;
    const email = document.getElementById('forgot_email').value;

    const errorMessage_2 = document.getElementById('error-message-4');
    // Kiểm tra nếu userName trống hoặc thông báo lỗi của userName đang hiển thị
    if (!userName.trim() && !email.trim()){
        errorMessage_2.style.display = 'none';
    }
    else if (!userName.trim()) {
        // Hiển thị thông báo yêu cầu nhập tên đăng nhập
        errorMessage_2.style.display = 'none';
        errorMessage_2.textContent = '*Vui lòng nhập tên đăng nhập trước.';
        errorMessage_2.style.display = 'block'; // Hiện thông báo lỗi
    } 
    else if (errorMessage_1.style.display === 'block') {
        errorMessage_2.style.display = 'none';
        // Nếu tên đăng nhập không tồn tại, yêu cầu sửa tên đăng nhập
        errorMessage_2.textContent = '*Vui lòng sửa tên đăng nhập.';
        errorMessage_2.style.display = 'block'; // Hiện thông báo lỗi
    } 
});


// Gửi mail để lấy lại mật khẩu khi người dùng quên
// Kiểm tra xem tên đăng nhập có tồn tại không
function checkUsernameExists(username) {
    return fetch('http://localhost:8080/user/register/user-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Tên đăng nhập không tồn tại.');
        }
        return true; // Tên đăng nhập tồn tại
    });
}

// Kiểm tra xem email có tương ứng với tên đăng nhập không
function checkEmailForUsername(username, email) {
    return fetch('http://localhost:8080/user/register/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, email: email })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Email không hợp lệ.'); // Ném lỗi để dừng chuỗi Promise
        }
        // Nếu email hợp lệ, ẩn thông báo lỗi
        document.getElementById('error-message-4').style.display = 'none';
        return true; // Email hợp lệ
    });
}

// Yêu cầu đặt lại mật khẩu
function requestPasswordReset(username, email) {
    return fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, email: email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Không thể gửi yêu cầu đặt lại mật khẩu.');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        alert("Đã gửi mã xác minh. Vui lòng kiểm tra email.");
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message-3').textContent = error.message;
        document.getElementById('error-message-3').style.display = 'block';
    });
}

// Bắt đầu đếm ngược 60 giây
function startCountdown() {
    let countdown = 60;
    const timerElement = document.getElementById('timer');
    const countdownElement = document.getElementById('countdown');

    timerElement.style.display = 'block';
    countdownElement.textContent = countdown;

    const intervalId = setInterval(() => {
        countdown -= 1;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(intervalId);
            timerElement.style.display = 'none';
            alert('Mã xác minh đã hết hạn. Vui lòng quay trở lại!');
            location.reload();
        }
    }, 1000);
}

// Xử lý sự kiện submit của form quên mật khẩu
document.getElementById('forgotPasswordFormElement').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('forgot_user_name').value;
    const email = document.getElementById('forgot_email').value;

    // Kiểm tra xem tên đăng nhập có tồn tại không
    checkUsernameExists(username)
        .then(() => {
            // Kiểm tra xem email có tương ứng với tên đăng nhập không
            return checkEmailForUsername(username, email);
        })
        .then(() => {
            // Gửi yêu cầu reset password nếu tên đăng nhập và email đều hợp lệ
            return requestPasswordReset(username, email);
        })
        .then(() => {
            document.getElementById('forgotPasswordForm').style.display = 'none';
            document.getElementById('verifyCodeForm').style.display = 'block';
            startCountdown(); // Bắt đầu đếm ngược 60 giây
        })
        .catch(error => {
            const errorMessage = document.getElementById('error-message-4');
            errorMessage.textContent = error.message; // Hiển thị thông báo lỗi
            errorMessage.style.display = 'block';
        });
});

// Xác minh mã reset code
document.getElementById('verifyCodeButton').addEventListener('click', function() {
    const resetCode = document.getElementById('reset_code').value;
    const username = document.getElementById('forgot_user_name').value;

    // Gửi yêu cầu xác minh mã
    fetch('http://localhost:8080/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, resetCode: resetCode })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('*Mã xác minh không hợp lệ.');
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        document.getElementById('verifyCodeForm').style.display = 'none';
        document.getElementById('resetPasswordForm').style.display = 'block'; // Hiện form nhập mật khẩu mới
    })
    .catch(error => {
        const errorMessage = document.getElementById('error-message-verify');
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    });
});

// Xử lý sự kiện nhấn nút đặt lại mật khẩu
document.getElementById('resetPasswordButton').addEventListener('click', function(event) {
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password_new').value;
    const username = document.getElementById('forgot_user_name').value;
    const errorMessageNewPassword = document.getElementById('error-message-new-password');
    const errorMessageConfirmPassword = document.getElementById('error-message-confirm-password');
    const errorMessageReset = document.getElementById('error-message-reset');

    // Ẩn tất cả các thông báo lỗi trước khi kiểm tra
    errorMessageNewPassword.style.display = 'none';
    errorMessageConfirmPassword.style.display = 'none';
    errorMessageReset.style.display = 'none';

    // Kiểm tra xem trường tên đăng nhập có để trống hay không
    if (!username) {
        errorMessageReset.textContent = "*Vui lòng nhập tên đăng nhập.";
        errorMessageReset.style.display = 'block';
        return;
    }

    // Kiểm tra xem trường mật khẩu mới có để trống hay không
    if (!newPassword) {
        errorMessageNewPassword.textContent = "*Vui lòng nhập mật khẩu mới.";
        errorMessageNewPassword.style.display = 'block';
        return;
    }

    // Kiểm tra xem trường xác nhận mật khẩu có để trống hay không
    if (!confirmPassword) {
        errorMessageConfirmPassword.textContent = "*Vui lòng nhập xác nhận mật khẩu.";
        errorMessageConfirmPassword.style.display = 'block';
        return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có giống nhau hay không
    if (newPassword !== confirmPassword) {
        errorMessageConfirmPassword.textContent = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
        errorMessageConfirmPassword.style.display = 'block';
        return;
    }

    // Gửi yêu cầu đặt lại mật khẩu với tên đăng nhập và mật khẩu mới
    fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username,
            newPassword: newPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Không thể đặt lại mật khẩu.');
        }
        return response.text();
    })
    .then(data => {
        alert("Mật khẩu của bạn đã được đặt lại thành công!");
        // Tải lại trang sau khi đặt lại mật khẩu thành công
        location.reload();
    })
    .catch(error => console.error('Error:', error));
});

