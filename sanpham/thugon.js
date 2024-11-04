const content = document.getElementById('introduce');
    const toggleBtn = document.getElementById('toggleBtn');

    toggleBtn.addEventListener('click', function() {
      content.classList.toggle('show'); // Thêm/xóa class 'show'
      if (content.classList.contains('show')) {
        toggleBtn.textContent = 'Thu gọn';
      } else {
        toggleBtn.textContent = 'Xem thêm';
      }
    });