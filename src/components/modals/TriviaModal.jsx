/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const TriviaModal = ({ open, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    if (open && !isQuizOver) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(
            "https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=5&difficulty=medium"
          );
          const currQuestions = response.data.map((q) => {
            return {
              question: q.question,
              options: [...q.incorrectAnswers, q.correctAnswer].sort(
                () => Math.random() - 0.5
              ),
              correctAnswer: q.correctAnswer,
            };
          });
          setQuestions(currQuestions);
        } catch (error) {
          console.error("Error fetching trivia questions:", error);
        }
      };

      fetchQuestions();
    }
  }, [open, isQuizOver]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizOver(true);
    }
  };

  const current = questions[currentQuestion];

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-4/5 lg:w-2/5 min-h-[240px] rounded-[6px] flex-col gap-6 flex-shrink-0 text-[#080D19] pb-6">
        <div className="h-16 lg:h-20 w-full rounded-[6px] py-6 px-8 flex items-center justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="font-medium text-xl">Trivia</p>
          <div
            onClick={onClose}
            className="cursor-pointer hover:bg-[#ebf5fe] transition-all duration-300 rounded-md p-1"
          >
            <IoMdClose size={24} />
          </div>
        </div>
        {isQuizOver ? (
          <div className="px-8 flex flex-col gap-1 items-center justify-center flex-1 text-lg">
            <p>Trivia Completed!</p>
            <p className="font-medium">
              Your Score: {score} / {questions.length}
            </p>
          </div>
        ) : !questions.length ? (
          <div className="px-8 flex flex-col gap-3">
            <p className="bg-slate-200 h-4 animate-pulse rounded-md w-1/3"></p>
            <div className="flex flex-col gap-4 text-lg">
              <p className="bg-slate-200 h-4 animate-pulse rounded-md"></p>
              <div className="answers flex flex-col gap-2">
                <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
                <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
                <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
                <div className="bg-slate-200 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div
              className={` bg-slate-200 h-4 animate-pulse w-20 self-end p-2 rounded-md`}
            ></div>
          </div>
        ) : (
          <div className="px-8 flex flex-col gap-3">
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="flex flex-col gap-4 lg:text-lg">
              <p className="font-medium">{current?.question}</p>
              <div className="answers flex flex-col gap-2">
                {current.options.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(answer)}
                    className={`p-1 rounded-lg border hover:bg-gray-100 text-sm lg:text-base disabled:pointer-events-none ${
                      selectedAnswer === answer
                        ? // ? answer === current.correctAnswer
                          answer === current.correctAnswer
                          ? "border-green-500 bg-green-200"
                          : "border-red-500 bg-red-200"
                        : answer === current.correctAnswer &&
                          selectedAnswer &&
                          "border-green-500 bg-green-200"
                    }`}
                    disabled={selectedAnswer}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
            <button
              className={` bg-blue-500 w-fit self-end p-2 rounded-lg text-white text-sm lg:text-base disabled:cursor-not-allowed disabled:bg-gray-400`}
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TriviaModal;
