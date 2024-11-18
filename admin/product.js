document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8080/ca-koi-nhat";
    const productTableBody = document.getElementById("product-table-body");
    const productModal = document.getElementById("productModal");
    const closeModalBtn = document.getElementById("close-modal");
    const addProductBtn = document.getElementById("add-product-btn");
    const productForm = document.getElementById("product-form");
    const modalTitle = document.getElementById("modal-title");
    const submitBtn = document.getElementById("submit-btn");
    const productTypeSelect = document.getElementById("product-type");
    const productStatusSelect = document.getElementById("product-status");
    const productSalePersonSelect = document.getElementById("product-sale-person");
    const productSexOfFishSelect = document.getElementById("product-sex-of-fish");
    const productDobOfFishSelect = document.getElementById("product-dob-of-fish");
    const productOriginOfFishSelect = document.getElementById("product-origin-of-fish");
    const paginationControls = document.getElementById("pagination-controls");

    let currentPage = 1;
    const productsPerPage = 5;

    // Fetch product types from API and populate options
    function fetchProductTypes() {
        fetch("http://localhost:8080/api/loaica")
            .then(response => response.json())
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

    // Fetch and display product data with pagination
    function fetchProducts(page = 1) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(products => {
                const start = (page - 1) * productsPerPage;
                const end = start + productsPerPage;
                const paginatedProducts = products.slice(start, end);
                productTableBody.innerHTML = "";

                paginatedProducts.forEach(product => {
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
                renderPaginationControls(products.length, page);
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Render pagination controls
    function renderPaginationControls(totalProducts, currentPage) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        paginationControls.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-btn");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", () => {
                currentPage = i;
                fetchProducts(currentPage);
            });
            paginationControls.appendChild(pageButton);
        }
    }

    // Attach event listeners to edit and delete buttons
    function attachEventListeners() {
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

    // Edit product
    function editProduct(id) {
        modalTitle.textContent = "Sửa sản phẩm";
        submitBtn.textContent = "Cập nhật";
        productModal.classList.add("show-modal");

        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById("product-id").value = product.idOfFish;
                document.getElementById("product-name").value = product.nameOfFish;
                productTypeSelect.value = product.typeOfFish;
                document.getElementById("product-price").value = product.price;
                document.getElementById("product-size").value = product.sizeOfFish;
                productStatusSelect.value = product.saleStatus;
                document.getElementById("product-image").value = product.image;
                document.getElementById("product-note").value = product.note || "";
                productSalePersonSelect.value = product.salePerson || "OnKoi Quang Minh";
                productSexOfFishSelect.value = product.sexOfFish || "";
                productDobOfFishSelect.value = product.dobOfFish || "";
                productOriginOfFishSelect.value = product.originOfFish || "";
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                alert("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
            });
    }

    // Delete product
    function deleteProduct(id) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            fetch(`http://localhost:8080/api/fish/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        alert("Xóa sản phẩm thành công!");
                        fetchProducts(currentPage);
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
        fetchProductTypes();
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
            saleStatus: productStatusSelect.value,
            image: document.getElementById("product-image").value,
            note: document.getElementById("product-note").value,
            salePerson: productSalePersonSelect.value,
            sexOfFish: productSexOfFishSelect.value,
            dobOfFish: productDobOfFishSelect.value,
            originOfFish: productOriginOfFishSelect.value
        };

        if (!productData.idOfFish || !productData.nameOfFish || !productData.price) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

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
                    alert(method === "POST" ? "Thêm sản phẩm thành công!" : "Cập nhật sản phẩm thành công!");
                    productModal.classList.remove("show-modal");
                    fetchProducts(currentPage);
                } else {
                    throw new Error("Error saving product");
                }
            })
            .catch(error => {
                console.error("Error saving product:", error);
                alert("Không thể lưu sản phẩm. Vui lòng thử lại sau.");
            });
    });

    // Initial fetch of product data and types
    fetchProducts(currentPage);
    fetchProductTypes();
});
