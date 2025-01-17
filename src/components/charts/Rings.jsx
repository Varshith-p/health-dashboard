import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { IoFootsteps, IoWater, IoBed } from "react-icons/io5";
import { PiFireFill } from "react-icons/pi";

const Rings = () => {
  const [ringData, setRingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the mapping of label to color and icon
  const activityStyles = {
    Sleep: { color: "#ca5cdd", icon: <IoBed fill="#ca5cdd" /> },
    Hydration: { color: "#3ea4f0", icon: <IoWater fill="#3ea4f0" /> },
    Steps: { color: "#7e481c", icon: <IoFootsteps fill="#7e481c" /> },
    Calories: { color: "#ffe808", icon: <PiFireFill fill="#ffe808" /> },
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://678977e32c874e66b7d8d6c8.mockapi.io/api/goals"
        );
        setRingData(response.data);
      } catch (error) {
        console.error("Error fetching ring data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4 xxl:gap-8 overflow-hidden">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 animate-pulse rounded-md h-32 lg:h-[200px]"
            ></div>
          ))
        : ringData.map((ring, index) => {
            const { color, icon } = activityStyles[ring.label] || {};
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-md relative flex w-full h-full flex-col items-center"
              >
                <div className="absolute top-1/3 text-3xl mb-2 flex flex-col gap-1 items-center">
                  <span>{icon}</span>
                  <span className="text-xs">{`${ring.progress}%`}</span>
                </div>
                <Chart
                  options={{
                    chart: {
                      id: `ring-${index}`,
                      sparkline: { enabled: true }, // Hides axes and grid
                    },
                    plotOptions: {
                      radialBar: {
                        hollow: { size: "70%" },
                        dataLabels: {
                          showOn: "always",
                          name: { show: false },
                          value: {
                            show: false,
                            fontSize: "14px",
                            formatter: (val) => `${val}%`,
                          },
                        },
                      },
                    },
                    colors: [color],
                  }}
                  series={[ring.progress]}
                  type="radialBar"
                  height="100"
                />
                <p className="text-center text-sm font-semibold mt-2">
                  {ring.label}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default Rings;
