import { useState } from "react";
import AllergiesModal from "./modals/AllergiesModal";
import ImmunizationsModal from "./modals/ImmunizationsModal";
import MedicationsModal from "./modals/MedicationsModal";
import DoctorsModal from "./modals/DoctorsModal";

const HealthCategories = () => {
  const [isAllergiesModalOpen, setAllergiesModalOpen] = useState(false);
  const [isImmunizationsModalOpen, setImmunizationsModalOpen] = useState(false);
  const [isMedicationsModalOpen, setMedicationsModalOpen] = useState(false);
  const [isDoctorsModalOpen, setDoctorsModalOpen] = useState(false);

  const handleCloseAllergies = () => {
    setAllergiesModalOpen(false);
  };
  const handleCloseImmunizations = () => {
    setImmunizationsModalOpen(false);
  };
  const handleCloseMedications = () => {
    setMedicationsModalOpen(false);
  };
  const handleCloseDoctors = () => {
    setDoctorsModalOpen(false);
  };

  return (
    <section className="my-6">
      <h1 className="text-xl xxl:text-3xl font-medium text-main-left">
        Health Categories
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 my-4 lg:my-6">
        <div
          className="bg-white px-4 py-2 xxl:py-4 rounded-md text-base xxl:text-xl cursor-pointer hover:shadow-md transition-all"
          onClick={() => setAllergiesModalOpen(true)}
        >
          <span>Allergies</span>
        </div>
        <div
          className="bg-white px-4 py-2 xxl:py-4 rounded-md text-base xxl:text-xl cursor-pointer hover:shadow-md transition-all"
          onClick={() => setImmunizationsModalOpen(true)}
        >
          <span>Immunizations</span>
        </div>
        <div
          className="bg-white px-4 py-2 xxl:py-4 rounded-md text-base xxl:text-xl cursor-pointer hover:shadow-md transition-all"
          onClick={() => setMedicationsModalOpen(true)}
        >
          <span>Medications</span>
        </div>
        <div
          className="bg-white px-4 py-2 xxl:py-4 rounded-md text-base xxl:text-xl cursor-pointer hover:shadow-md transition-all"
          onClick={() => setDoctorsModalOpen(true)}
        >
          <span>Doctors</span>
        </div>
      </div>
      <AllergiesModal
        open={isAllergiesModalOpen}
        onClose={handleCloseAllergies}
      />
      <ImmunizationsModal
        open={isImmunizationsModalOpen}
        onClose={handleCloseImmunizations}
      />
      <MedicationsModal
        open={isMedicationsModalOpen}
        onClose={handleCloseMedications}
      />
      <DoctorsModal open={isDoctorsModalOpen} onClose={handleCloseDoctors} />
    </section>
  );
};

export default HealthCategories;
