import Chart from "react-apexcharts";
// https://67896e2b2c874e66b7d8b8cb.mockapi.io/api/caloriesBurned

const CaloriesBurned = () => {
  const caloriesData = [
    { activity: "Running", calories: 400 },
    { activity: "Cycling", calories: 200 },
    { activity: "Yoga", calories: 100 },
  ];

  const chartOptions = {
    chart: {
      id: "calories-chart",
      toolbar: { show: false },
    },
    labels: caloriesData.map((data) => data.activity),
    colors: ["#FFD700", "#FFC107", "#FFEB3B"], // Shades of yellow
    legend: {
      position: "bottom",
      labels: {
        colors: "#333", // Dark color for better readability
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val} calories`,
      },
      shared: false,
      followCursor: true,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"], // Dark labels for better contrast
        fontSize: "14px",
        fontWeight: "light",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%", // Adjust the size of the donut hole (default is 65%)
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () =>
                `${caloriesData.reduce((a, b) => a + b.calories, 0)} calories`,
            },
          },
        },
      },
    },
  };

  const series = caloriesData.map((data) => data.calories);

  return (
    <div className="bg-white p-8 rounded-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Calories Burned
      </h3>
      <Chart
        options={chartOptions}
        series={series}
        type="donut" // Change type to "donut"
        width="100%"
        height="300"
      />
    </div>
  );
};

export default CaloriesBurned;
