// Fetch order data from API
async function fetchOrders() {
  try {
      const response = await fetch("http://localhost:8080/api/orders");
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const orders = await response.json();
      return orders;
  } catch (error) {
      console.error("Error fetching orders: ", error);
  }
}

// Load data when the page is loaded
async function loadData() {
  const orders = await fetchOrders();

  if (orders) {
      populateOrderTable(orders);  // Display order data in the table
  }
}

loadData();

// Generate the main order table row dynamically
function generateOrderRow(order) {
  const latestStatus = order.tinhTrangDonHangs.reduce((latest, current) => {
      return current.id > latest.id ? current : latest;
  }, order.tinhTrangDonHangs[0]);
  return `
      <tr>
          <td>${order.id}</td>
          <td>${order.deliveryTime}</td>
          <td>${order.phoneNumber.tenKhachHang}</td>
          <td><span class="status ${latestStatus.situation === 'Đã giao hàng' ? 'delivered' : latestStatus.situation === 'Đã hủy' ? 'canceled' : 'processing'}">${latestStatus.situation}</span></td>
          <td>${order.totalPrice}Đ</td>
          <td>
              <button class="btn view-btn" onclick="viewOrderDetails(${order.id})">Xem</button>
              <button class="btn view-btn" onclick="viewStatusHistory(${order.id})">Tình trạng</button>
          </td>
      </tr>
  `;
}

// Populate the main order table with data from API
function populateOrderTable(orders) {
  const tableBody = document.querySelector('.order-table tbody');
  let rows = '';
  orders.forEach(order => {
      rows += generateOrderRow(order);
  });
  tableBody.innerHTML = rows;
}

// Apply search, filter, and sort
function applySearchFilterSort() {
  fetchOrders().then(orders => {
      const searchValue = document.getElementById('search-bar').value.toLowerCase();
      const filterStatus = document.getElementById('filter-status').value;
      const sortOrder = document.getElementById('sort-orders').value;

      let filteredOrders = orders;

      // Search functionality
      if (searchValue) {
          filteredOrders = filteredOrders.filter(order =>
              order.id.toString().includes(searchValue) ||
              order.phoneNumber.tenKhachHang.toLowerCase().includes(searchValue) ||
              order.userName.toLowerCase().includes(searchValue)
          );
      }

      // Filter functionality
      if (filterStatus !== 'all') {
          filteredOrders = filteredOrders.filter(order => {


            
              const latestStatus = order.tinhTrangDonHangs.reduce((latest, current) => {
                  return current.id > latest.id ? current : latest;
              }, order.tinhTrangDonHangs[0]);
              return latestStatus.situation === filterStatus;
          });
      }

      // Sort functionality
      filteredOrders.sort((a, b) => {
          if (sortOrder === 'date-desc') {
              return new Date(b.deliveryTime) - new Date(a.deliveryTime);
          } else if (sortOrder === 'date-asc') {
              return new Date(a.deliveryTime) - new Date(b.deliveryTime);
          } else if (sortOrder === 'total-desc') {
              return b.totalPrice - a.totalPrice;
          } else if (sortOrder === 'total-asc') {
              return a.totalPrice - b.totalPrice;
          }
      });

      populateOrderTable(filteredOrders);
  });
}

// Generate order details dynamically
function generateOrderDetails(order) {
  let orderItemsHtml = '';
  order.chitietdonhangs.forEach(detail => {
      orderItemsHtml += `
          <div class="order-item">
              <img src="${detail.idOfFish.image}" alt="${detail.idOfFish.nameOfFish}">
              <div class="order-item-details">
                  <h4>${detail.idOfFish.nameOfFish}</h4>
                  <p><i>${detail.idOfFish.originOfFish}</i></p>
                  <p>SL: ${detail.quantity}</p>
              </div>
          </div>
      `;
  });

  const orderInfoHtml = `
      <div class="order-info">
          <p><strong>Ngày đặt hàng:</strong> ${order.orderDate}</p>
          <p><strong>Hình thức giao:</strong> ${order.pay}</p>
          <p><strong>Người nhận:</strong> ${order.userName}</p>
          <p><strong>Số điện thoại:</strong> ${order.phoneNumber.phoneNumber}</p>
          <p><strong>Thời gian giao:</strong> ${order.deliveryTime}</p>
          <p><strong>Địa chỉ nhận:</strong> ${order.address}</p>
      </div>
  `;

  document.getElementById('order-items').innerHTML = orderItemsHtml;
  document.getElementById('order-info-container').innerHTML = orderInfoHtml;
  document.getElementById('total-price').innerText = order.totalPrice;
}

// View order details in a modal
function viewOrderDetails(orderId) {
  fetchOrders().then((orders) => {
      const order = orders.find(o => o.id === orderId);
      if (order) {
          generateOrderDetails(order);

          const modal = document.getElementById('orderModal');
          modal.style.display = "block";

          const closeBtn = document.getElementsByClassName("close")[0];
          closeBtn.onclick = function() {
              modal.style.display = "none";
          };

          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          };
      }
  });
}

// View status history in a modal
function viewStatusHistory(orderId) {
  fetchOrders().then((orders) => {
      const order = orders.find(o => o.id === orderId);
      if (order) {
          const statusTableBody = document.getElementById('status-table-body');
          let statusRowsHtml = '';

          order.tinhTrangDonHangs.forEach(status => {
              statusRowsHtml += `
                  <tr>
                      <td>${status.times}</td>
                      <td>${status.situation}</td>
                      <td>${status.statusDetails}</td>
                  </tr>
              `;
          });

          statusTableBody.innerHTML = statusRowsHtml;
          statusTableBody.dataset.orderId = order.id;

          const statusModal = document.getElementById('statusModal');
          statusModal.style.display = "block";

          const closeStatusBtn = document.getElementsByClassName("close-status")[0];
          closeStatusBtn.onclick = function() {
              statusModal.style.display = "none";
          };

          window.onclick = function(event) {
              if (event.target == statusModal) {
                  statusModal.style.display = "none";
              }
          };
      }
  });
}

document.getElementById('add-status-btn').addEventListener('click', () => {
  const orderId = document.querySelector('.status-table tbody').dataset.orderId;
  const newStatus = {
      times: document.getElementById('new-time').value,
      situation: document.getElementById('new-situation').value,
      statusDetails: document.getElementById('new-details').value
  };
  postOrderStatus(orderId, newStatus);
});

async function postOrderStatus(orderId, newStatus) {
  try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStatus),
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Status added: ", await response.json());
      alert("Status added successfully!");
  } catch (error) {
      console.error("Error posting new status: ", error);
      alert("Không thêm được trạng thái. Vui lòng thử lại.");
      window.location.href = "./order.html";
  }
}

