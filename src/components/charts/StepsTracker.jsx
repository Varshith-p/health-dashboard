import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const StepsTracker = () => {
  const [stepsData, setStepsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndPrepareData = async () => {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const totalDays = new Date(year, month + 1, 0).getDate();

      // Generate all dates for the current month
      const allDates = Array.from({ length: totalDays }, (_, index) => {
        const date = new Date(year, month, index + 1);
        return {
          date: date.toISOString().split("T")[0],
          steps: 0, // Default steps for missing dates
        };
      });

      try {
        // Fetch data from API
        const response = await axios.get(
          "https://678977e32c874e66b7d8d6c8.mockapi.io/api/stepsTracker"
        );

        // Merge API data with allDates
        const mergedData = allDates.map((entry) => {
          const match = response.data.find((data) => data.date === entry.date);
          return {
            ...entry,
            steps: match ? match.steps : 0, // Use API value
          };
        });

        setStepsData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAndPrepareData();
  }, []);

  // Prepare x-axis categories and series data
  const categories = stepsData.map((_, index) => index + 1); // Days of the month
  const seriesData = stepsData.map((data) => data.steps);

  const chartOptions = {
    chart: {
      id: "steps-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories,
      title: { text: "Dates" },
      labels: {
        formatter: (val) =>
          [1, 8, 15, 22, 29].includes(val) ? val.toString() : "", // Show specific days only
      },
    },
    yaxis: {
      title: { text: "Steps" },
    },
    colors: ["#ca5cdd"],
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Steps",
      data: seriesData,
    },
  ];

  return (
    <div className="bg-white p-8 rounded-md">
      <h3 className="text-lg font-semibold mb-4 text-center">Daily Steps</h3>
      {loading ? (
        <div className="bg-slate-200 animate-pulse rounded-md h-72"></div>
      ) : (
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          width="100%"
          height="300"
        />
      )}
    </div>
  );
};

export default StepsTracker;
