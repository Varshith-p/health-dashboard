import { useState } from "react";
import TriviaModal from "./modals/TriviaModal";

const Trivia = () => {
  const [isTriviaModalOpen, setTriviaModalOpen] = useState(false);

  const handleCloseTrivia = () => {
    setTriviaModalOpen(false);
  };

  return (
    <section className="py-8 bg-white rounded-md">
      <div className="px-4 lg:px-8 py-4 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-main-left">
          Test Your Knowledge!
        </h2>
        <p className="text-gray-600 mb-6 xxl:mb-4 lg:w-3/5 text-center">
          Take our quick trivia quiz and learn fascinating facts about nutrition
          and health. Challenge yourself and see how much you know!
        </p>
        <button
          className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
          onClick={() => setTriviaModalOpen(true)}
        >
          Start Trivia
        </button>
      </div>
      <TriviaModal open={isTriviaModalOpen} onClose={handleCloseTrivia} />
    </section>
  );
};

export default Trivia;
