// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Fetch data from the API and create the chart
fetch('http://localhost:8080/api/orders')
    .then(response => response.json())
    .then(dataFromAPI => {
        // Extract and count fish types for orders that have been successfully delivered
        const fishTypeCounts = {};
        dataFromAPI.forEach(order => {
            const isDelivered = order.tinhTrangDonHangs.some(status => status.situation === "Đã giao hàng");
            if (isDelivered) {
                order.chitietdonhangs.forEach(detail => {
                    const typeOfFish = detail.idOfFish.typeOfFish;
                    fishTypeCounts[typeOfFish] = (fishTypeCounts[typeOfFish] || 0) + detail.quantity;
                });
            }
        });

        // Convert fishTypeCounts to arrays for labels and data
        const labels = Object.keys(fishTypeCounts);
        const data = Object.values(fishTypeCounts);

        // Define colors corresponding to each fish type
        const colorMapping = {
            'Asagi': '#4e73df',   // text-primary
            'Kohaku': '#e74a3b',  // text-danger
            'Showa': '#343a40',   // text-dark
            'Shusui': '#1cc88a',  // text-success
            'Tancho': '#17a673'    // text-info
        };

        // Map colors based on fish types
        const backgroundColors = labels.map(label => colorMapping[label] || '#ffffff'); // Default to white if not found

        // Pie Chart Example
        const ctx = document.getElementById("myPieChart");
        const myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors, // Use the mapped colors
                    hoverBackgroundColor: backgroundColors, // Ensure hover colors match
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    })
    .catch(error => console.error('Error fetching data:', error));
