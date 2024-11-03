// Hàm lấy danh sách người dùng từ API
async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:8080/loai-ca/Kohaku');
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu từ API');
      }
      const users = await response.json();
      displayUsers(users);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
  
  // Hàm hiển thị người dùng lên giao diện HTML
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Xóa nội dung cũ
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  }
  
  // Gọi hàm fetchUsers khi trang được tải
  document.addEventListener('DOMContentLoaded', fetchUsers);
  