// JavaScript for managing customer data using REST API

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8080/api/taikhoan/all"; // Replace with your REST API URL
    const customerTableBody = document.getElementById("customer-table-body");
    const addCustomerBtn = document.getElementById("add-customer-btn");
    const customerModal = document.getElementById("customerModal");
    const customerForm = document.getElementById("customer-form");
    
    const closeModalBtn = document.getElementById("close-modal");


    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            if (customerModal) {
                customerModal.style.display = "none";
            }
        });
    }
        if (addCustomerBtn) {
        addCustomerBtn.addEventListener("click", () => {
            if (customerForm) {
                customerForm.reset();
                customerForm.dataset.id = "";
                document.getElementById("modal-title").textContent = "Thêm khách hàng mới";
                document.getElementById("submit-btn").textContent = "Thêm";
                if (customerModal) {
                    customerModal.style.display = "block";
                }
            }
        });
    }

    if (customerForm) {
        customerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const id = customerForm.dataset.id;
            const customerData = {
                userName: document.getElementById("customer-username").value,
                passWord: document.getElementById("customer-password").value,
                email: document.getElementById("customer-email").value,
                phoneNumber: document.getElementById("customer-phone").value,
                tenKhachHang: document.getElementById("customer-name").value,
                diaChi: document.getElementById("customer-address").value
            };

            if (id) {
                // Update customer
                fetch(`http://localhost:8080/api/taikhoan/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customerData)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Error updating customer");
                        }
                    })
                    .then(() => {
                        if (customerModal) {
                            customerModal.style.display = "none";
                        }
                        fetchCustomers();
                    })
                    .catch(error => console.error("Error updating customer:", error));
            } else {
                // Add new customer
                fetch("http://localhost:8080/api/taikhoan/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customerData)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Error adding customer");
                        }
                    })
                    .then(() => {
                        if (customerModal) {
                            customerModal.style.display = "none";
                        }
                        fetchCustomers();
                    })
                    .catch(error => console.error("Error adding customer:", error));
            }
        });
    }

    // Fetch and display customer data
    function fetchCustomers() {
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching customers");
                }
            })
            .then(customers => {
                if (customerTableBody) {
                    customerTableBody.innerHTML = "";
                    let count = 1;
                    customers.forEach(customer => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>#KH00${count++}</td>
                            <td>${customer.tenKhachHang}</td>
                            <td>${customer.email}</td>
                            <td>${customer.phoneNumber}</td>
                            <td>
                                <button class="btn edit-btn" data-id="${customer.userName}">Sửa</button>
                                <button class="btn delete-btn" data-id="${customer.userName}">Xóa</button>
                            </td>
                        `;
                        customerTableBody.appendChild(row);
                    });
                    attachEventListeners();
                }
            })
            .catch(error => console.error("Error fetching customers:", error));
    }

    // Edit customer
    function editCustomer(userName) {
        fetch(`http://localhost:8080/api/taikhoan/${userName}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching customer details");
                }
            })
            .then(customer => {
                if (customerForm) {
                    document.getElementById("customer-username").value = customer.userName;
                    document.getElementById("customer-password").value = customer.passWord;
                    document.getElementById("customer-email").value = customer.email;
                    document.getElementById("customer-phone").value = customer.phoneNumber;
                    document.getElementById("customer-name").value = customer.tenKhachHang;
                    document.getElementById("customer-address").value = customer.diaChi;
                    customerForm.dataset.id = customer.userName;
                    document.getElementById("modal-title").textContent = "Sửa thông tin khách hàng";
                    document.getElementById("submit-btn").textContent = "Cập nhật";
                    if (customerModal) {
                        customerModal.style.display = "block";
                    }
                }
            })
            .catch(error => console.error("Error fetching customer details:", error));
    }

    // Delete customer
    function deleteCustomer(userName) {
        if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
            fetch(`http://localhost:8080/api/taikhoan/delete/${userName}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        fetchCustomers();
                    } else {
                        throw new Error("Error deleting customer");
                    }
                })
                .catch(error => console.error("Error deleting customer:", error));
        }
    }

    // Attach event listeners to edit and delete buttons
    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", () => {
                editCustomer(button.dataset.id);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => {
                deleteCustomer(button.dataset.id);
            });
        });
    }

    // Close modal when clicking outside
    if (customerModal) {
        window.addEventListener("click", event => {
            if (event.target === customerModal) {
                customerModal.style.display = "none";
            }
        });
    }

    // Initial fetch of customer data
    fetchCustomers();
});
