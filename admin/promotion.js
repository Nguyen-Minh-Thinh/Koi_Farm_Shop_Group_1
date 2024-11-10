document.addEventListener("DOMContentLoaded", function() { 
    const apiUrl = "http://localhost:8080/api/khuyenmai"; // Đường dẫn API khuyến mãi
    const promotionTableBody = document.getElementById("promotion-table-body"); // Thay đổi id để phù hợp
    const addPromotionButton = document.getElementById("add-promotion"); // Thay đổi id để phù hợp
    const modal = document.getElementById("promotion-modal"); // Thay đổi id để phù hợp
    const closeModalButton = document.getElementById("close-modal");
    const promotionForm = document.getElementById("promotion-form"); // Thay đổi id để phù hợp
    const promotionCodeInput = document.getElementById("promotion-code");
    const promotionNameInput = document.getElementById("promotion-name"); // Thay đổi id để phù hợp
    const promotionDiscountInput = document.getElementById("promotion-discount"); // Thay đổi id để phù hợp
    const promotionStartDateInput = document.getElementById("promotion-start-date"); // Thay đổi id để phù hợp
    const promotionEndDateInput = document.getElementById("promotion-end-date"); // Thay đổi id để phù hợp
    let editingPromotionId = null; // Biến lưu trữ ID khuyến mãi đang chỉnh sửa

    // Fetch all promotions
    function fetchPromotions() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                promotionTableBody.innerHTML = "";
                data.forEach(promotion => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${promotion.maKhuyenMai}</td>
                        <td>${promotion.tenKhuyenMai}</td>
                        <td>${promotion.giamGiaPercent}%</td>
                        <td>${promotion.ngayBatDau}</td>
                        <td>${promotion.ngayKetThuc}</td>
                        <td class="action-buttons">
                            <button class="edit-button" onclick="editPromotion(${promotion.id}, '${promotion.tenKhuyenMai}', ${promotion.giamGiaPercent}, '${promotion.ngayBatDau}', '${promotion.ngayKetThuc}')">Sửa</button>
                            <button class="delete-button" onclick="deletePromotion(${promotion.id})">Xóa</button>
                        </td>
                    `;
                    promotionTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching promotions:", error));
    }

    // Open modal for adding promotion
    addPromotionButton.addEventListener("click", function() {
        modal.style.display = "block";
        document.getElementById("modal-title").innerText = "Thêm Khuyến Mãi";
        promotionForm.reset();
        editingPromotionId = null;
    });

    // Close modal
    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission for adding/editing promotion
    promotionForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const promotionCode = promotionCodeInput.value;
        const promotionName = promotionNameInput.value;
        const promotionDiscount = promotionDiscountInput.value;
        const promotionStartDate = promotionStartDateInput.value;
        const promotionEndDate = promotionEndDateInput.value;

        if (editingPromotionId) {
            // Edit existing promotion
            const updatedPromotion = {
                maKhuyenMai: promotionCode,
                tenKhuyenMai: promotionName,
                giamGiaPercent: promotionDiscount,
                ngayBatDau: promotionStartDate,
                ngayKetThuc: promotionEndDate
            };
            fetch(`${apiUrl}/${editingPromotionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedPromotion)
            })
            .then(response => {
                if (response.ok) {
                    fetchPromotions();
                } else {
                    console.error("Error updating promotion");
                }
                modal.style.display = "none";
            })
            .catch(error => console.error("Error updating promotion:", error));
        } else {
            // Add new promotion
            const newPromotion = {
                maKhuyenMai: promotionCode,
                tenKhuyenMai: promotionName,
                giamGiaPercent: promotionDiscount,
                ngayBatDau: promotionStartDate,
                ngayKetThuc: promotionEndDate
            };
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPromotion)
            })
            .then(response => {
                if (response.ok) {
                    fetchPromotions();
                    modal.style.display = "none";
                } else {
                    console.error("Error adding promotion");
                }
            })
            .catch(error => console.error("Error adding promotion:", error));
        }
    });

    // Edit a promotion
    window.editPromotion = function(id,maKhuyenMai, tenKhuyenMai, giamGiaPercent, ngayBatDau, ngayKetThuc) {
        modal.style.display = "block";
        document.getElementById("modal-title").innerText = "Sửa Khuyến Mãi";
        promotionCodeInput.value = maKhuyenMai;
        promotionNameInput.value = tenKhuyenMai;
        promotionDiscountInput.value = giamGiaPercent;
        promotionStartDateInput.value = ngayBatDau;
        promotionEndDateInput.value = ngayKetThuc;
        editingPromotionId = id; // Gán ID khuyến mãi đang chỉnh sửa
    };

    // Delete a promotion
    window.deletePromotion = function(id) {
        if (confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    fetchPromotions();
                } else {
                    console.error("Error deleting promotion");
                }
            })
            .catch(error => console.error("Error deleting promotion:", error));
        }
    };

    // Initial fetch of promotions
    fetchPromotions();
});
