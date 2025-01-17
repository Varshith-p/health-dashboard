/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

const AllergiesModal = ({ open, onClose }) => {
  const [allergies, setAllergies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://67893bfe2c874e66b7d81628.mockapi.io/api/allergies"
        );
        setAllergies(response.data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 z-[1000] h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-4/5 lg:w-[580px] xxl:w-[640px] xxl:min-h-[240px] rounded-[6px] flex-col gap-6 flex-shrink-0 text-[#080D19] pb-6">
        <div className="lg:h-16 xxl:h-20 w-full rounded-[6px] py-4 xxl:py-6 px-6 xxl:px-8 flex items-center justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="font-medium text-lg xxl:text-xl">Allergies</p>
          <div
            onClick={onClose}
            className="cursor-pointer hover:bg-[#ebf5fe] transition-all duration-300 rounded-md p-1"
          >
            <IoMdClose size={24} />
          </div>
        </div>
        {loading ? (
          <div className="px-6 xxl:px-8 flex flex-col gap-2 w-2/3">
            <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
            <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
            <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
            <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <ol className="px-6 xxl:px-8 text-sm lg:text-base xxl:text-lg list-disc list-inside">
            {allergies?.map((allergy) => (
              <li key={allergy.id}>{allergy.name}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default AllergiesModal;
