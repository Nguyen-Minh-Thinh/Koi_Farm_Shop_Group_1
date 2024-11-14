// Lấy dữ liệu từ API
async function fetchData() {
    try {
        const orderResponse = await fetch("http://localhost:8080/api/orders");
        const orderData = await orderResponse.json();
        
        const promotionResponse = await fetch("http://localhost:8080/api/khuyenmai");
        const promotionData = await promotionResponse.json();
        
        const fishTypeResponse = await fetch("http://localhost:8080/api/loaica");
        const fishTypeData = await fishTypeResponse.json();
        
        const koiResponse = await fetch("http://localhost:8080/ca-koi-nhat");
        const koiData = await koiResponse.json();
        
        const customerResponse = await fetch("http://localhost:8080/api/taikhoan/all");
        const customerData = await customerResponse.json();
        
        // Tính toán dữ liệu tổng quan
        const revenue = orderData.reduce((acc, order) => acc + order.totalPrice, 0);
        const orderCount = orderData.length;
        const customerCount = customerData.length;
        const fishCount = koiData.length;

        // Hiển thị các số liệu tổng quan
        document.getElementById('revenue').innerText = `₫${revenue.toLocaleString()}`;
        document.getElementById('orderCount').innerText = orderCount;
        document.getElementById('fishCount').innerText = fishCount;
        document.getElementById('customerCount').innerText = customerCount;


        // Nhóm và đếm số lượng từng loại cá koi
        const fishTypeCounts = koiData.reduce((acc, fish) => {
            acc[fish.typeOfFish] = (acc[fish.typeOfFish] || 0) + 1;
            return acc;
        }, {});

        const fishTypeLabels = Object.keys(fishTypeCounts);
        const fishTypeDataValues = Object.values(fishTypeCounts);

        // Tính toán doanh thu và đơn hàng theo tháng
        const monthlyRevenue = Array(12).fill(0);
        const monthlyOrders = Array(12).fill(0);
        const monthlyProducts = Array(12).fill(0);
        const orderStatusCounts = {
            'Đang xử lý': 0,
            'Đã hoàn thành': 0,
            'Đã hủy': 0
        };
        
        orderData.forEach(order => {
            const month = new Date(order.orderDate).getMonth();
            monthlyRevenue[month] += order.totalPrice;
            monthlyOrders[month] += 1;
            monthlyProducts[month] += order.chitietdonhangs.reduce((acc, item) => acc + item.quantity, 0);

            // Lấy trạng thái đơn hàng có id lớn nhất
            const latestStatus = order.tinhTrangDonHangs.reduce((latest, current) => {
                return current.id > latest.id ? current : latest;
            }, order.tinhTrangDonHangs[0]);

            if (latestStatus && latestStatus.situation in orderStatusCounts) {
                orderStatusCounts[latestStatus.situation] += 1;
            }
        });

        // Vẽ biểu đồ doanh thu theo tháng
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [{
                    label: 'Doanh thu theo tháng',
                    data: monthlyRevenue,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Vẽ biểu đồ số lượng đơn hàng theo tháng
        const orderCtx = document.getElementById('orderChart').getContext('2d');
        new Chart(orderCtx, {
            type: 'bar',
            data: {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [{
                    label: 'Số lượng đơn hàng theo tháng',
                    data: monthlyOrders,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Vẽ biểu đồ số lượng sản phẩm đã bán theo tháng
        const productCtx = document.getElementById('productChart').getContext('2d');
        new Chart(productCtx, {
            type: 'bar',
            data: {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [{
                    label: 'Số lượng sản phẩm đã bán theo tháng',
                    data: monthlyProducts,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Vẽ biểu đồ khuyến mãi theo thời gian
        const promotionCtx = document.getElementById('promotionChart').getContext('2d');
        const promotionLabels = promotionData.map(promo => `${promo.tenKhuyenMai} (${promo.ngayBatDau} - ${promo.ngayKetThuc})`);
        const promotionDiscounts = promotionData.map(promo => parseFloat(promo.giamGiaPercent));
        new Chart(promotionCtx, {
            type: 'bar',
            data: {
                labels: promotionLabels,
                datasets: [{
                    label: 'Phần trăm khuyến mãi',
                    data: promotionDiscounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Vẽ biểu đồ số lượng loại cá koi
        const fishTypeCtx = document.getElementById('fishTypeChart').getContext('2d');
        new Chart(fishTypeCtx, {
            type: 'bar', // Biểu đồ cột
            data: {
                labels: fishTypeLabels,
                datasets: [{
                    label: 'Số lượng loại cá koi',
                    data: fishTypeDataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Lấy dữ liệu từ API cho thức ăn cá koi
        const foodResponse = await fetch("http://localhost:8080/thuc-an-cho-ca");
        const foodData = await foodResponse.json();

        // Nhóm và đếm số lượng từng loại thức ăn cá koi
        const foodTypeCounts = foodData.reduce((acc, food) => {
            acc[food.typeOfFood] = (acc[food.typeOfFood] || 0) + 1;
            return acc;
        }, {});

        const foodTypeLabels = Object.keys(foodTypeCounts);
        const foodTypeDataValues = Object.values(foodTypeCounts);

        // Vẽ biểu đồ số lượng loại thức ăn cá koi
        const foodTypeCtx = document.getElementById('foodTypeChart').getContext('2d');
        new Chart(foodTypeCtx, {
            type: 'bar', // Sử dụng biểu đồ cột cho loại thức ăn cá koi
            data: {
                labels: foodTypeLabels,
                datasets: [{
                    label: 'Số lượng loại thức ăn cá koi',
                    data: foodTypeDataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Gọi hàm lấy dữ liệu khi tải trang
fetchData();
