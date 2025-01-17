import axios from "axios";
import { useEffect, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";

// https://6789c49add587da7ac279548.mockapi.io/api/illness

const Passport = () => {
  const [healthConditions, setHealthConditions] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    page: {
      margin: Margin.MEDIUM,
    },
    filename: `HealthPassport.pdf`,
  };

  const htmlToPDF = () => {
    const getTargetElement = () => document.getElementById("passport");
    generatePDF(getTargetElement, options);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://6789c49add587da7ac279548.mockapi.io/api/illness"
        );
        setHealthConditions(response.data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="my-6">
      <div className="flex w-full justify-between">
        <h1 className="text-xl xxl:text-3xl font-medium text-main-left">
          Health Passport
        </h1>
        <button
          onClick={htmlToPDF}
          className="bg-blue-400 hover:bg-blue-500 px-2 py-1 xxl:py-2 rounded-md text-white"
        >
          Download
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 xxl:gap-6 my-6">
          <div className="flex flex-col gap-4 px-4 py-6 rounded-md shadow-md bg-white">
            <p className="bg-slate-200 animate-pulse rounded-md text-xl text-center font-medium w-2/3 min-h-8 self-center flex-1 flex items-center"></p>
            <div className="flex flex-col gap-4 justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 py-6 rounded-md shadow-md bg-white">
            <p className="bg-slate-200 animate-pulse rounded-md text-xl text-center font-medium w-2/3 min-h-8 self-center flex-1 flex items-center"></p>
            <div className="flex flex-col gap-4 justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 py-6 rounded-md shadow-md bg-white">
            <p className="bg-slate-200 animate-pulse rounded-md text-xl text-center font-medium w-2/3 min-h-8 self-center flex-1 flex items-center"></p>
            <div className="flex flex-col gap-4 justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 py-6 rounded-md shadow-md bg-white">
            <p className="bg-slate-200 animate-pulse rounded-md text-xl text-center font-medium w-2/3 min-h-8 self-center flex-1 flex items-center"></p>
            <div className="flex flex-col gap-4 justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="bg-slate-200 animate-pulse rounded-md w-1/3 h-4"></p>
                <p className="bg-slate-200 h-4 w-3/5 animate-pulse rounded-md"></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 xxl:gap-6 my-6 bg-[#ebf5fe]/60"
          id="passport"
        >
          {healthConditions.map((condition, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 xxl:gap-8 p-4 rounded-md shadow-md bg-white"
            >
              <h3 className="xxl:text-xl text-center font-medium w-2/3 self-center flex-1 flex items-center">
                {condition.illness}
              </h3>
              <div className="flex flex-col gap-2 justify-between p-4">
                <div className="flex flex-col gap-1 text-sm xxl:text-base">
                  <p>Status:</p>
                  <p
                    className={`${
                      condition.status == "Active"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    } py-1 px-2 text-white rounded-full`}
                  >
                    {condition.status}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-sm xxl:text-base">
                  <p>Last Case:</p>
                  <p
                    className={`${
                      condition.status == "Active"
                        ? "text-yellow-500"
                        : "text-green-500"
                    } text-base xxl:text-lg font-medium`}
                  >
                    {condition.lastCase}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Passport;
