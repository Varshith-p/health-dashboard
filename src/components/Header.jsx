/* eslint-disable react/prop-types */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Header = ({ loading, user }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // Custom Left Arrow
  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-1 lg:left-4 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-[#ebf5fe] transition-all duration-300 p-1 z-[500]"
      >
        <FaAngleLeft size={24} />
      </button>
    );
  };

  // Custom Right Arrow
  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-1 lg:right-4 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-[#ebf5fe] transition-all duration-300 p-1 z-[500]"
      >
        <FaAngleRight size={24} />
      </button>
    );
  };

  if (loading) {
    return (
      <section className="bg-white px-4 py-6 lg:px-16 lg:py-8 rounded-md flex flex-col gap-2">
        <p className="bg-slate-200 h-10 w-3/5 animate-pulse rounded-md"></p>
        <p className="bg-slate-200 h-3 w-5/6 animate-pulse rounded-md"></p>
        <p className="bg-slate-200 h-3 w-5/6 animate-pulse rounded-md"></p>
      </section>
    );
  }

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlay={true}
      autoPlaySpeed={5000}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      className="shadow-md rounded-md bg-white w-full"
    >
      <section className="bg-white px-8 py-6 lg:px-16 lg:py-8 rounded-md flex flex-col gap-1">
        <p className="text-base lg:text-2xl xxl:text-3xl text-main-left">
          Welcome back, {user?.name?.first}!
        </p>
        <p className="lg:w-3/5 text-xs lg:text-sm xxl:text-lg">
          Stay on track with your health and wellness goals. Let&apos;s make
          today productive and balanced!
        </p>
      </section>
      <section className="bg-white px-8 py-6 lg:px-16 lg:py-8 rounded-md flex flex-col items-center justify-center h-full text-center lg:text-xl xxl:text-2xl text-main-left">
        <p className="">
          You&apos;ve hit your hydration goal 3 days in a row! Great work!
        </p>
        {/* <p>You&apos;re just 2,000 steps away from your weekly steps target.</p>x */}
      </section>
      <section className="bg-white px-8 py-6 lg:px-16 lg:py-8 rounded-md flex flex-col items-center justify-center h-full text-center lg:text-xl xxl:text-2xl text-main-left">
        <p className="">
          Your sleep quality improved by 10% compared to last week.
        </p>
      </section>
    </Carousel>
  );
};

export default Header;
