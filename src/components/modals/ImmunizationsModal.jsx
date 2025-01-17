/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import generatePDF, { Margin } from "react-to-pdf";
import axios from "axios";

// https://67893bfe2c874e66b7d81628.mockapi.io/api/allergies

const ImmunizationsModal = ({ open, onClose }) => {
  const [immunizations, setImmunizations] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    page: {
      margin: Margin.MEDIUM,
    },
    filename: `Immunizations.pdf`,
  };

  const htmlToPDF = () => {
    const getTargetElement = () => document.getElementById("immunizations");
    generatePDF(getTargetElement, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://67893bfe2c874e66b7d81628.mockapi.io/api/immunizations"
        );
        setImmunizations(response.data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 z-[1000] h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-4/5 lg:w-3/5 min-h-[240px] rounded-[6px] flex-col gap-6 flex-shrink-0 text-[#080D19] pb-6">
        <div className="lg:h-16 xxl:h-20 w-full rounded-[6px] py-4 xxl:py-6 px-6 xxl:px-8 flex items-center justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="font-medium text-lg xxl:text-xl">Immunizations</p>
          <div
            onClick={onClose}
            className="cursor-pointer hover:bg-[#ebf5fe] transition-all duration-300 rounded-md p-1"
          >
            <IoMdClose size={24} />
          </div>
        </div>
        <div
          id="immunizations"
          className="rounded border border-[#EEEEFF] mx-6 overflow-auto"
        >
          <table className="w-full table-auto min-w-max text-left rounded">
            {/* row */}
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF] font-medium text-sm xxl:text-base">
                <th className="p-2 xxl:p-3 font-medium">Vaccine</th>
                <th className="p-2 xxl:p-3 font-medium">Date Administered</th>
                <th className="p-2 xxl:p-3 font-medium">Next Due Date</th>
                <th className="p-2 xxl:p-3 font-medium">Administered By</th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="text-sm xxl:text-base">
                <tr className="rounded border-b border-[#EEEEFF]">
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                </tr>
                <tr className="rounded border-b border-[#EEEEFF]">
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                </tr>
                <tr className="rounded border-b border-[#EEEEFF]">
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                </tr>
                <tr className="rounded border-b border-[#EEEEFF]">
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-2">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-sm xxl:text-base">
                {immunizations?.map((row, index) => (
                  <tr key={index} className="rounded border-b border-[#EEEEFF]">
                    <td className="p-2 xxl:p-3">{row.vaccine}</td>
                    <td className="p-2 xxl:p-3">{row.dateAdministered}</td>
                    <td className="p-2 xxl:p-3">{row.nextDueDate}</td>
                    <td className="p-2 xxl:p-3">{row.administeredBy}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {!loading && (
          <button
            onClick={htmlToPDF}
            className="bg-blue-400 text-white hover:bg-blue-500 px-2 py-1 xxl:py-2 rounded-md w-fit mx-6 self-end text-sm xxl:text-base"
          >
            Download
          </button>
        )}
      </div>
    </section>
  );
};

export default ImmunizationsModal;
