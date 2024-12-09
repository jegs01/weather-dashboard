import Chart from "chart.js/auto";

export default function renderChart(containerId, forecast) {
  const container = document.getElementById(containerId);
  container.innerHTML = `<canvas id="forecast-chart"></canvas>`;

  const canvas = document.getElementById("forecast-chart");
  const ctx = canvas.getContext("2d");

  function setCanvasHeight() {
    if (window.innerWidth >= 1024) {
      canvas.style.height = "600px";
    } else {
      canvas.style.height = "300px";
    }
  }

  setCanvasHeight();
  window.addEventListener("resize", setCanvasHeight);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: forecast.map((item) => new Date(item.date).toDateString()),
      datasets: [
        {
          label: "Temperature",
          data: forecast.map((item) => item.main.temp),
          borderColor: "#007acc",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#333",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
    },
  });
}
