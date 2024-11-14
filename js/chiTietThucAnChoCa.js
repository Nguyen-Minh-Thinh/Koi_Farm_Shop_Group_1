// Hàm lấy id từ URL
function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Lấy id của sản phẩm từ URL
const idOfFish = getIdFromURL();

// Hàm gửi GET request đến server và cập nhật thông tin sản phẩm
function fetchProductDetails(id) {
    fetch(`http://localhost:8080/thuc-an-cho-ca/${id}`)
        .then(response => response.json())
        .then(data => {
            // Cập nhật thông tin sản phẩm vào HTML
            document.getElementById("detailProductImage").src = data.image;
            document.getElementById("productName").textContent = data.caption; // Sửa lại ID cho khớp
            document.getElementById("detailProductNote").textContent = data.note;
            document.getElementById("detailProductPrice").textContent = `${data.price} ₫`;
            const statusButton = document.getElementById("detailStatusButton");
            statusButton.innerText = data.saleStatus;

            // Kiểm tra nếu trạng thái là "đã bán"
            if (data.saleStatus === " Đã bán") {
                statusButton.disabled = true;
                statusButton.style.backgroundColor = "gray";

                // Cập nhật trạng thái và màu sắc cho buyButton
                const buyButton = document.getElementById("buyButton");
                buyButton.disabled = true;
                buyButton.style.backgroundColor = "gray";
            }


            document.getElementById("salePerson").textContent = data.salePerson;
            document.getElementById("brand").textContent = data.brand;
            document.getElementById("typeOfFood").textContent = data.typeOfFood;
            document.getElementById("origin").textContent = data.origin;
            document.getElementById("weight").textContent = data.weight;
            // Cập nhật trạng thái bán hàng
            document.getElementById("detailStatusButton").textContent = data.saleStatus;
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
        });
}

// Gọi hàm fetch để lấy thông tin sản phẩm
if (idOfFish) {
    fetchProductDetails(idOfFish);
}
