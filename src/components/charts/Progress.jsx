import Chart from "react-apexcharts";

const Progress = () => {
  const radialData = [
    { label: "Hydration", progress: 80 }, // 80% of the daily water goal
    { label: "Steps", progress: 60 }, // 60% of the daily steps goal
    { label: "Calories", progress: 90 }, // 90% of the daily calorie burn goal
  ];

  const chartOptions = {
    chart: {
      id: "radial-bar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "16px",
          },
          value: {
            fontSize: "14px",
            formatter: (val) => `${val}%`,
          },
          total: {
            show: true,
            label: "Overall Progress",
            formatter: () => {
              const totalProgress =
                radialData.reduce((sum, goal) => sum + goal.progress, 0) /
                radialData.length;
              return `${Math.round(totalProgress)}%`;
            },
          },
        },
      },
    },
    labels: radialData.map((data) => data.label), // Activity labels
    colors: ["#4FAFFF", "#42A9FF", "#D4ECFF"], // Use colors from style guide
  };

  const series = radialData.map((data) => data.progress); // Progress values

  return (
    <div className="bg-white p-8 rounded-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Health Goals Progress
      </h3>
      <Chart
        options={chartOptions}
        series={series}
        type="radialBar"
        height="350"
      />
    </div>
  );
};

export default Progress;
