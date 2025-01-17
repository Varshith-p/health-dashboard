import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
// https://67896e2b2c874e66b7d8b8cb.mockapi.io/api/hydrationData

const HydrationChart = () => {
  const [hydrationData, setHydrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date(); // Replace with `new Date()` for dynamic date
      const month = today.getMonth();
      const year = today.getFullYear();
      const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in the current month

      const allDates = Array.from({ length: totalDays }, (_, index) => {
        const date = new Date(year, month, index + 1);
        return {
          date: date.toISOString().split("T")[0],
          waterIntake: null, // Default water intake for missing dates
        };
      });

      try {
        const response = await axios.get(
          "https://67896e2b2c874e66b7d8b8cb.mockapi.io/api/hydrationData"
        );

        // Merge API data with allDates
        const mergedData = allDates.map((entry) => {
          const match = response.data.find((data) => data.date === entry.date);
          return {
            ...entry,
            waterIntake: match ? match.waterIntake : null, // Use API value
          };
        });

        setHydrationData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare x-axis categories and series data
  const categories = hydrationData.map((_, index) => index + 1); // Days of the month
  const seriesData = hydrationData.map((data) => data.waterIntake);

  const chartOptions = {
    chart: {
      id: "hydration-chart",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight", // Makes the bars and lines straight
    },
    xaxis: {
      categories,
      title: { text: "Dates" },
      labels: {
        formatter: (val) =>
          [1, 8, 15, 22, 29].includes(val) ? val.toString() : "", // Adjust index for correct alignment
      },
    },
    yaxis: {
      title: { text: "Water Intake (ml)" },
      min: 0, // Ensure y-axis starts from 0
    },
    colors: ["#3ea4f0"],
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Water Intake (ml)",
      data: seriesData,
    },
  ];
  return (
    <div className="bg-white p-8 rounded-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Daily Hydration (ml)
      </h3>
      {loading ? (
        <div className="bg-slate-200 animate-pulse rounded-md h-72"></div>
      ) : (
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          width="100%"
          height="300"
        />
      )}
    </div>
  );
};

export default HydrationChart;
