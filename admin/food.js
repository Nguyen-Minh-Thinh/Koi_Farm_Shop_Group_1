document.addEventListener("DOMContentLoaded", function () {
    const foodApiUrl = "http://localhost:8080/thuc-an-cho-ca";
    const foodTableBody = document.getElementById("food-table-body");
    const foodModal = document.getElementById("foodModal");
    const closeFoodModalBtn = document.getElementById("close-food-modal");
    const addFoodBtn = document.getElementById("add-food-btn");
    const foodForm = document.getElementById("food-form");
    const foodModalTitle = document.getElementById("food-modal-title");
    const foodSubmitBtn = document.getElementById("food-submit-btn");

    // Notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    document.body.appendChild(notification);

    function showNotification(message, type = "success") {
        notification.innerText = message;
        notification.classList.add("show", type);

        setTimeout(() => {
            notification.classList.remove("show", type);
        }, 3000);
    }

    // Fetch and display food data
    function fetchFoods() {
        fetch(foodApiUrl)
            .then(response => response.json())
            .then(foods => {
                foodTableBody.innerHTML = "";
                foods.forEach(food => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${food.id}</td>
                        <td><img src="${food.image}" alt="${food.caption}" width="80"></td>
                        <td>${food.caption}</td>
                        <td>${food.typeOfFood}</td>
                        <td>${food.price} VND</td>
                        <td>${food.weight}</td>
                        <td>${food.saleStatus}</td>
                        <td class="action-buttons">
                            <button class="btn edit-btn" data-id="${food.id}">Sửa</button>
                            <button class="btn delete-btn" data-id="${food.id}">Xóa</button>
                        </td>
                    `;
                    foodTableBody.appendChild(row);
                });
                attachFoodEventListeners();
            })
            .catch(error => console.error("Error fetching foods:", error));
    }

    // Attach event listeners for edit and delete buttons
    function attachFoodEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", () => {
                editFood(button.dataset.id);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => {
                deleteFood(button.dataset.id);
            });
        });
    }

    // Open modal to add new food
    addFoodBtn.addEventListener("click", () => {
        foodModalTitle.textContent = "Thêm thức ăn mới";
        foodSubmitBtn.textContent = "Thêm";
        foodForm.reset();
        foodModal.classList.add("show-modal");
    });

    // Close food modal
    closeFoodModalBtn.addEventListener("click", () => {
        foodModal.classList.remove("show-modal");
    });

    window.addEventListener("click", (event) => {
        if (event.target === foodModal) {
            foodModal.classList.remove("show-modal");
        }
    });

    // Edit food
    function editFood(id) {
        foodModalTitle.textContent = "Sửa thức ăn";
        foodSubmitBtn.textContent = "Cập nhật";
        foodModal.classList.add("show-modal");

        fetch(`${foodApiUrl}/${id}`)
            .then(response => response.json())
            .then(food => {
                document.getElementById("food-id").value = food.id;
                document.getElementById("food-name").value = food.caption;
                document.getElementById("food-type").value = food.typeOfFood;
                document.getElementById("food-price").value = food.price;
                document.getElementById("food-weight").value = food.weight;
                document.getElementById("food-status").value = food.saleStatus;
                document.getElementById("food-image").value = food.image;
                document.getElementById("food-note").value = food.note;
                document.getElementById("food-salePerson").value = food.salePerson; // This field is hidden but still required
                document.getElementById("food-brand").value = food.brand;
                document.getElementById("food-origin").value = food.origin;
            })
            .catch(error => console.error("Error fetching food details:", error));
    }

    // Delete food
    function deleteFood(id) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            fetch(`${foodApiUrl}/${id}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        fetchFoods();
                        showNotification("Xóa thức ăn thành công!", "success");
                    }
                })
                .catch(error => console.error("Error deleting food:", error));
        }
    }

    // Handle food form submission
    foodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const foodData = {
            id: document.getElementById("food-id").value,
            caption: document.getElementById("food-name").value,
            typeOfFood: document.getElementById("food-type").value,
            price: document.getElementById("food-price").value,
            weight: document.getElementById("food-weight").value,
            saleStatus: document.getElementById("food-status").value,
            image: document.getElementById("food-image").value,
            note: document.getElementById("food-note").value,
            salePerson: "OnKoi Quang Minh", // Set default value here for hidden field
            brand: document.getElementById("food-brand").value,
            origin: document.getElementById("food-origin").value
        };

        const method = foodSubmitBtn.textContent === "Thêm" ? "POST" : "PUT";
        const url = method === "POST" ? `${foodApiUrl}/create` : `${foodApiUrl}/update/${foodData.id}`;

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(foodData)
        })
            .then(response => {
                if (response.ok) {
                    foodModal.classList.remove("show-modal");
                    fetchFoods();
                    const action = method === "POST" ? "Thêm" : "Cập nhật";
                    showNotification(`${action} thức ăn thành công!`, "success");
                } else {
                    throw new Error("Error saving food");
                }
            })
            .catch(error => console.error("Error saving food:", error));
    });

    // Initial fetch of food data
    fetchFoods();
});
