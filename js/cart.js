// Kiểm tra khi tài liệu đã sẵn sàng
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Hàm chạy khi tài liệu đã sẵn sàng
function ready() {
    loadCartItems(); // Tải sản phẩm từ localStorage và hiển thị trên trang giỏ hàng

    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    document.getElementsByClassName('purchase_button')[0].addEventListener('click', purchaseClicked);
}

// Hàm thêm sản phẩm vào localStorage khi nhấn nút "Thêm vào giỏ"
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('product_img')[0].src;

    addItemToLocalStorage(title, price, imageSrc);
    alert('Sản phẩm đã được thêm vào giỏ hàng');
}

// Hàm lưu sản phẩm vào localStorage
function addItemToLocalStorage(title, price, imageSrc) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = { title, price, imageSrc };

    // Kiểm tra xem sản phẩm đã tồn tại chưa
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title === title) {
            alert('Sản phẩm này đã có trong giỏ hàng');
            return;
        }
    }

    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Hàm hiển thị sản phẩm từ localStorage trên trang giỏ hàng
function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items.displayCart');

    // Xóa nội dung hiện tại trong giỏ hàng (nếu có)
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        addItemToCart(item.title, item.price, item.imageSrc);
    });

    updateCartTotal();
}

// Hàm thêm sản phẩm vào giao diện giỏ hàng
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];

    var cartRowContents = `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

// Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
function removeCartItem(event) {
    var buttonClicked = event.target;
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText;

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems = cartItems.filter(item => item.title !== title); // Xóa sản phẩm khỏi localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    buttonClicked.parentElement.parentElement.remove(); // Xóa sản phẩm khỏi giao diện
    updateCartTotal();
}

// Hàm xử lý khi số lượng sản phẩm thay đổi
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Hàm xử lý khi nhấn nút "Thanh toán"
function purchaseClicked() {
    alert('Cảm ơn bạn đã mua hàng');
    localStorage.removeItem('cartItems'); // Xóa toàn bộ giỏ hàng trong localStorage
    document.getElementsByClassName('cart-items')[0].innerHTML = ''; // Xóa hiển thị giỏ hàng
    updateCartTotal();
}

// Hàm tính tổng giá trị giỏ hàng
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('₫', '').replace(',', ''));
        var quantity = quantityElement.value;

        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-cart')[0].innerText = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
