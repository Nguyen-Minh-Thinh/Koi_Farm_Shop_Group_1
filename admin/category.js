document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://localhost:8080/api/loaica";
    const categoryTableBody = document.getElementById("category-table-body");
    const addCategoryButton = document.getElementById("add-category");
    const modal = document.getElementById("category-modal");
    const closeModalButton = document.getElementById("close-modal");
    const categoryForm = document.getElementById("category-form");
    const categoryNameInput = document.getElementById("category-name");
    const categoryImageInput = document.getElementById("category-image");
    const categoryVideoInput = document.getElementById("category-video");
    let editingCategoryId = null;

    // Fetch all categories
    function fetchCategories() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                categoryTableBody.innerHTML = "";
                data.forEach(category => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${category.typeOfFish}</td>
                        <td><img src="${category.image}" alt="${category.typeOfFish}" style="width: 100px;"></td>
                        <td><a href="${category.video}" target="_blank">Xem video</a></td>
                        <td class="action-buttons">
                            <button class="edit-button" onclick="editCategory('${category.typeOfFish}', '${category.image}', '${category.video}')">Sửa</button>
                            <button class="delete-button" onclick="deleteCategory('${category.typeOfFish}')">Xóa</button>
                        </td>
                    `;
                    categoryTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching categories:", error));
    }

    // Open modal for adding category
    addCategoryButton.addEventListener("click", function() {
        modal.style.display = "block";
        document.getElementById("modal-title").innerText = "Thêm Danh Mục";
        document.getElementById("category-name").disabled = false;
        categoryForm.reset();
        editingCategoryId = null;
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

    // Handle form submission for adding/editing category
    categoryForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const categoryName = categoryNameInput.value;
        const categoryImage = categoryImageInput.value;
        const categoryVideo = categoryVideoInput.value;

        if (editingCategoryId) {
            // Edit existing category
            const updatedCategory = { typeOfFish: categoryName, image: categoryImage, video: categoryVideo };
            fetch(`${apiUrl}/${editingCategoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCategory)
            })
                .then(response => {
                    if (response.ok) {
                        fetchCategories();
                    } else {
                        console.error("Error updating category");
                    }
                    modal.style.display = "none";
                })
                .catch(error => console.error("Error updating category:", error));
        } else {
            // Add new category
            const newCategory = { typeOfFish: categoryName, image: categoryImage, video: categoryVideo };
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCategory)
            })
                .then(response => response.json())
                .then(() => {
                    fetchCategories();
                    modal.style.display = "none";
                })
                .catch(error => console.error("Error adding category:", error));
        }
    });

    // Edit a category
    window.editCategory = function(typeOfFish, image, video) {
        modal.style.display = "block";
        document.getElementById("modal-title").innerText = "Sửa Danh Mục";
        document.getElementById("category-name").disabled = true;
        categoryNameInput.value = typeOfFish;
        categoryImageInput.value = image;
        categoryVideoInput.value = video;
        editingCategoryId = typeOfFish;
    };

    // Delete a category
    window.deleteCategory = function(typeOfFish) {
        if (confirm("Bạn có chắc chắn muốn xóa loại cá này?")) {
            fetch(`${apiUrl}/${typeOfFish}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        fetchCategories();
                    } else {
                        console.error("Error deleting category");
                    }
                })
                .catch(error => console.error("Error deleting category:", error));
        }
    };

    // Initial fetch of categories
    fetchCategories();
});
