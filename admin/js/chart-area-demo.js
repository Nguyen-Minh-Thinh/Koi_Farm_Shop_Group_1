// Fetch orders data from API and calculate monthly earnings
async function fetchAndCalculateMonthlyEarnings() {
  try {
      const response = await fetch("http://localhost:8080/api/orders");
      const orders = await response.json();

      const earningsData = {};

      // Process data to get monthly earnings
      orders.forEach(order => {
          const isDelivered = order.tinhTrangDonHangs.some(status =>
              status.situation === "Đã giao hàng" || status.situation === "da-giao"
          );

          if (isDelivered) {
              const deliveryDate = new Date(order.deliveryTime);
              const yearMonth = `${deliveryDate.getFullYear()}-${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}`;

              // Sum totalPrice for the delivered orders of each month
              if (!earningsData[yearMonth]) {
                  earningsData[yearMonth] = 0;
              }
              earningsData[yearMonth] += order.totalPrice;
          }
      });

      // Convert earnings data to sorted array for chart
      const sortedEarnings = Object.keys(earningsData)
          .sort()
          .map(month => ({
              month,
              total: earningsData[month]
          }));

      // Render the chart with calculated data
      const labels = sortedEarnings.map(item => item.month);
      const data = sortedEarnings.map(item => item.total);
      renderChart(labels, data);

  } catch (error) {
      console.error("Error fetching earnings data:", error);
  }
}

// Render chart using Chart.js
function renderChart(labels, data) {
  const ctx = document.getElementById("myAreaChart").getContext("2d");
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: "Earnings",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: data,
          }]
      },
      options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          },
          scales: {
              x: {
                  type: 'category',
                  time: {
                      unit: 'month'
                  },
                  grid: {
                      display: false,
                      drawBorder: false
                  },
                  ticks: {
                      maxTicksLimit: 12
                  }
              },
              y: {
                  ticks: {
                      maxTicksLimit: 5,
                      padding: 10,
                      callback: function(value) {
                          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                      }
                  },
                  grid: {
                      color: "rgb(234, 236, 244)",
                      zeroLineColor: "rgb(234, 236, 244)",
                      drawBorder: false,
                      borderDash: [2],
                      zeroLineBorderDash: [2]
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyColor: "#858796",
                  titleMarginBottom: 10,
                  titleColor: '#6e707e',
                  titleFont: {
                      size: 14
                  },
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  intersect: false,
                  mode: 'index',
                  caretPadding: 10,
                  callbacks: {
                      label: function(context) {
                          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
                      }
                  }
              }
          }
      }
  });
}

// Call the function to fetch data and display the chart
fetchAndCalculateMonthlyEarnings();
