// JavaScript to fetch product data from API and display in product table

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8080/ca-koi-nhat"; // Replace with your API URL
    const productTableBody = document.getElementById("product-table-body");
    const productModal = document.getElementById("productModal");
    const closeModalBtn = document.getElementById("close-modal");
    const addProductBtn = document.getElementById("add-product-btn");
    const productForm = document.getElementById("product-form");
    const modalTitle = document.getElementById("modal-title");
    const submitBtn = document.getElementById("submit-btn");
    const productTypeSelect = document.getElementById("product-type");

    // Fetch product types from API and populate options
    function fetchProductTypes() {
        fetch("http://localhost:8080/api/loaica")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching product types");
                }
            })
            .then(types => {
                productTypeSelect.innerHTML = "";
                types.forEach(type => {
                    const option = document.createElement("option");
                    option.value = type.typeOfFish;
                    option.textContent = type.typeOfFish;
                    productTypeSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching product types:", error));
    }

    // Fetch and display product data
    function fetchProducts() {
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching products");
                }
            })
            .then(products => {
                if (productTableBody) {
                    productTableBody.innerHTML = "";
                    products.forEach(product => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${product.idOfFish}</td>
                            <td><img src="${product.image}" alt="${product.nameOfFish}" width="80"></td>
                            <td>${product.nameOfFish}</td>
                            <td>${product.typeOfFish}</td>
                            <td>${product.price} VND</td>
                            <td>${product.sizeOfFish}</td>
                            <td>${product.saleStatus}</td>
                            <td class="action-buttons">
                                <button class="btn edit-btn" data-id="${product.idOfFish}">Sửa</button>
                                <button class="btn delete-btn" data-id="${product.idOfFish}">Xóa</button>
                            </td>
                        `;
                        productTableBody.appendChild(row);
                    });
                    attachEventListeners();
                }
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Attach event listeners to view, edit, and delete buttons
    function attachEventListeners() {
        document.querySelectorAll(".view-btn").forEach(button => {
            button.addEventListener("click", () => {
                viewProduct(button.dataset.id);
            });
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", () => {
                editProduct(button.dataset.id);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => {
                deleteProduct(button.dataset.id);
            });
        });
    }

    // View product details
    function viewProduct(id) {
        console.log("View product with ID:", id);
        // You can add modal logic here to display product details in a modal
    }

    // Edit product
    function editProduct(id) {
        modalTitle.textContent = "Sửa sản phẩm";
        submitBtn.textContent = "Cập nhật";
        productModal.classList.add("show-modal");

        // Fetch product data and populate the form
        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById("product-id").value = product.idOfFish;
                document.getElementById("product-name").value = product.nameOfFish;
                productTypeSelect.value = product.typeOfFish;
                document.getElementById("product-price").value = product.price;
                document.getElementById("product-size").value = product.sizeOfFish;
                document.getElementById("product-status").value = product.saleStatus;
                document.getElementById("product-image").value = product.image;
            })
            .catch(error => console.error("Error fetching product details:", error));
    }

    // Delete product
    function deleteProduct(id) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            fetch(`http://localhost:8080/api/fish/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        fetchProducts();
                    } else {
                        throw new Error("Error deleting product");
                    }
                })
                .catch(error => console.error("Error deleting product:", error));
        }
    }

    // Open modal to add new product
    addProductBtn.addEventListener("click", () => {
        modalTitle.textContent = "Thêm sản phẩm mới";
        submitBtn.textContent = "Thêm";
        productForm.reset();
        fetchProductTypes(); // Populate product types when adding new product
        productModal.classList.add("show-modal");
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
        productModal.classList.remove("show-modal");
    });

    window.addEventListener("click", (event) => {
        if (event.target === productModal) {
            productModal.classList.remove("show-modal");
        }
    });

    // Handle form submission
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productData = {
            idOfFish: document.getElementById("product-id").value,
            nameOfFish: document.getElementById("product-name").value,
            typeOfFish: productTypeSelect.value,
            price: document.getElementById("product-price").value,
            sizeOfFish: document.getElementById("product-size").value,
            saleStatus: document.getElementById("product-status").value,
            image: document.getElementById("product-image").value
        };

        const method = submitBtn.textContent === "Thêm" ? "POST" : "PUT";
        const url = method === "POST" ? "http://localhost:8080/api/fish/create" : `http://localhost:8080/api/fish/update/${productData.idOfFish}`;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                if (response.ok) {
                    productModal.classList.remove("show-modal");
                    fetchProducts();
                } else {
                    throw new Error("Error saving product");
                }
            })
            .catch(error => console.error("Error saving product:", error));
    });

    // Initial fetch of product data
    fetchProducts();
    fetchProductTypes();
});
