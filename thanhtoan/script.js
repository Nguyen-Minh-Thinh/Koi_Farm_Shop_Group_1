let appliedPromoCode = '';
// Hàm gọi API để lấy thông tin tài khoản và giỏ hàng

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Gọi hàm để lấy username từ cookie
const userName = getCookie("username");
console.log(userName);

async function fetchUserData() {
    try {
        const responseAccount = await fetch(`http://localhost:8080/api/taikhoan/${userName}`); //khi nào đăng nhập, userName được lưu ở Session, khi thanh toán chỉ gọi ra thôi
        // const responseAccount = await fetch(`http://localhost:8080/api/taikhoan/nguyenminhthinh`); //test
        const accountData = await responseAccount.json();

        // Điền thông tin người dùng vào form
        document.getElementById('name').value = accountData.tenKhachHang;
        document.getElementById('phone').value = accountData.phoneNumber;
        // document.getElementById('address').value = accountData.diaChi;

        const responseCart = await fetch(`http://localhost:8080/giohang/${userName}`); //khi nào đăng nhập, userName được lưu ở Session, khi thanh toán chỉ gọi ra thôi
        // const responseCart = await fetch(`http://localhost:8080/giohang/nguyenminhthinh`); // test
        const cartData = await responseCart.json();

        // Tính tổng tiền giỏ hàng
        let totalAmount = cartData.reduce((sum, item) => sum + item.tongCong, 0);
        document.getElementById('totalAmount').value = totalAmount;

    } catch (error) {
        console.error('Error fetching user or cart data:', error);
    }
}

// Tính toán thời gian giao hàng dựa trên thời gian hiện tại + 2 ngày
function calculateDeliveryTime() {
    const now = new Date();
    now.setDate(now.getDate() + 2); // Thêm 2 ngày
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// Hiển thị thời gian giao hàng
document.getElementById('deliveryTime').value = calculateDeliveryTime();

// Hàm kiểm tra mã khuyến mãi
// Hàm kiểm tra mã khuyến mãi
async function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value;
    let totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const currentDate = new Date();

    // Check if the promo code is already applied
    if (appliedPromoCode) {
        alert("Chỉ được áp dụng một mã khuyến mãi cho mỗi đơn hàng.");
        return;
    }

    if (isNaN(totalAmount)) {
        alert("Giá trị tổng không hợp lệ.");
        return;
    }

    try {
        const responsePromo = await fetch(`http://localhost:8080/api/khuyenmai`);
        if (!responsePromo.ok) {
            throw new Error('Network response was not ok');
        }
        const promotions = await responsePromo.json();

        // Find the promotion based on promoCode and validity dates
        const promo = promotions.find(p =>
            p.maKhuyenMai === promoCode &&
            new Date(p.ngayBatDau) <= currentDate &&
            new Date(p.ngayKetThuc) >= currentDate
        );

        if (promo) {
            const discount = parseFloat(promo.giamGiaPercent) / 100;
            totalAmount = totalAmount * (1 - discount);
            document.getElementById('totalAmount').value = totalAmount;

            // Store the promo ID instead of the promo code itself
            appliedPromoCode = promo.id; // This stores the ID of the promo code

            alert(`Áp dụng mã khuyến mãi thành công! Giảm ${promo.giamGiaPercent}%`);
        } else {
            alert("Mã khuyến mãi không hợp lệ hoặc đã hết hạn.");
        }

    } catch (error) {
        console.error('Error fetching promotions:', error);
        alert("Đã xảy ra lỗi khi áp dụng mã khuyến mãi.");
    }
}
function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // ${hours}:${minutes}:${seconds}
}

async function submitPayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const promoCodeId = appliedPromoCode || null; // ID của mã khuyến mãi đã áp dụng
    const orderDate = getFormattedDateTime(); // Ngày hiện tại dạng YYYY-MM-DD
    // const orderDate = new Date();

    // Kiểm tra các thông tin nhập vào
    if (!name || !address || !paymentMethod || !totalAmount) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    // Lấy thông tin tài khoản từ API
    const accountData = await fetch(`http://localhost:8080/api/taikhoan/${userName}`);
    // const accountData = await fetch(`http://localhost:8080/api/taikhoan/nguyenminhthinh`); //test
    const account = await accountData.json();

    console.log("Thông tin tài khoản:", account);

    // Lấy dữ liệu khuyến mãi từ API
    const promoData = await fetch(`http://localhost:8080/api/khuyenmai`);
    const promotions = await promoData.json();
    const promo = promotions.find(p => p.id === promoCodeId); // Lấy mã khuyến mãi

    console.log("Mã khuyến mãi:", promo);

    // Lấy dữ liệu giỏ hàng từ API
    const cartData = await fetch(`http://localhost:8080/giohang/${userName}`);

    // const cartData = await fetch(`http://localhost:8080/giohang/nguyenminhthinh`); // test
    const cartItems = await cartData.json();
    if (!accountData || !cartData) {
        alert("Không tìm thấy thông tin cần thiết.");
        return;
    }
    
    console.log("Giỏ hàng:", cartItems);

    const chitietdonhangs = await Promise.all(cartItems.map(async (item) => {
        const fishData = await fetch(`http://localhost:8080/ca-koi-nhat/${item.id_of_fish}`);
        const fishDetails = await fishData.json();
        return {
            id: {
                donHangId: 0,
                idOfFish: fishDetails.idOfFish
            },  // Nếu API tự sinh ID thì để trống
            idOfFish: {
                idOfFish: fishDetails.idOfFish,
                image: fishDetails.image,
                saleStatus: fishDetails.saleStatus,
                nameOfFish: fishDetails.nameOfFish,
                note: fishDetails.note,
                price: fishDetails.price,
                salePerson: fishDetails.salePerson,
                sexOfFish: fishDetails.sexOfFish,
                dobOfFish: fishDetails.dobOfFish,
                sizeOfFish: fishDetails.sizeOfFish,
                originOfFish: fishDetails.originOfFish,
                typeOfFish: fishDetails.typeOfFish
            },
            quantity: 1
        };
    }));

    console.log("Chi tiết đơn hàng:", chitietdonhangs);

    // Tạo đối tượng đơn hàng
    const orderData = {
        id: 0, // ID tự động tăng, có thể để null nếu API tự sinh ID
        address: address,
        deliveryTime: deliveryTime,
        orderDate: getFormattedDateTime(), // Chú ý cái này lát fix
        pay: paymentMethod,
        totalPrice: parseFloat(totalAmount),
        userName: name,
        phoneNumber: {
            userName: account.userName,
            passWord:  account.passWord,
            email: account.email,
            phoneNumber: account.phoneNumber,
            tenKhachHang: account.tenKhachHang
        },
        khuyenMai: promo ? {
            id: promo.id,
            maKhuyenMai: promo.maKhuyenMai,
            tenKhuyenMai: promo.tenKhuyenMai,
            giamGiaPercent: promo.giamGiaPercent,
            ngayBatDau: promo.ngayBatDau,
            ngayKetThuc: promo.ngayKetThuc
        } : null,
        chitietdonhangs: chitietdonhangs,
        tinhTrangDonHangs: [
            {
                situation: "Đang xử lý",
                statusDetails: "Đơn hàng đang được xử lý",
                times: getFormattedDateTime()
            }
        ]
    };

    console.log("Dữ liệu đơn hàng chuẩn bị gửi:", JSON.stringify(orderData));

    // Gửi yêu cầu POST tới API
    try {
        const response = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert(`Thanh toán thành công! Đơn hàng ID: ${result.id}`);
        const deleteCartResponse = await fetch(`http://localhost:8080/giohang/${userName}`, {
            method: 'DELETE',
        });
        // lát gỡ 

        if (!deleteCartResponse.ok) {
            throw new Error('Không thể xóa giỏ hàng.');
        }

        console.log("Giỏ hàng đã được xóa");
        setTimeout(() => {
            window.location.href = '../caidat.html';
        }, 0);
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu thanh toán:', error);
        alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
    }
}

document.addEventListener('DOMContentLoaded', fetchUserData);
