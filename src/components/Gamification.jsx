import CaloriesBurned from "./charts/CaloriesBurned";
import HydrationChart from "./charts/HydrationChart";
// import Progress from "./charts/Progress";
import Rings from "./charts/Rings";
import StepsTracker from "./charts/StepsTracker";
import Trivia from "./Trivia";

const Gamification = () => {
  return (
    <section className="my-6">
      <h1 className="text-xl xxl:text-3xl font-medium text-main-left">
        Gamification
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-4 xxl:gap-6">
        <Rings />
        {/* <Progress /> */}
        <StepsTracker />
        <HydrationChart />
        <CaloriesBurned />
        <div className="lg:col-span-2">
          <Trivia />
        </div>
      </div>
    </section>
  );
};

export default Gamification;
