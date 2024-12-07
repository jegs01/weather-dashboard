import Chart from "chart.js/auto";

export default function renderChart(containerId, forecast) {
  const container = document.getElementById(containerId);
  container.innerHTML = `<canvas id="forecast-chart"></canvas>`;

  const ctx = document.getElementById("forecast-chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: forecast.map((item) => item.date),
      datasets: [
        {
          label: "Temperature (°C)",
          data: forecast.map((item) => item.temp),
          borderColor: "#007acc",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
