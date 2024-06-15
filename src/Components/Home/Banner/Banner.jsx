import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";
import banner3 from "../../../assets/Banner/banner3.jpg";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "./style.css"; // Import the CSS file

function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3100,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero custom-hero-height"
            style={{
              backgroundImage: `url(${banner1})`,
            }}
          >
            <div className="hero-overlay custom-hero-overlay bg-[#080303] bg-opacity-65"></div>
            <div className="hero-content text-neutral-content">
              <div className="max-w-max text-center md:text-left">
                <h1 className="md:text-5xl text-2xl pb-2 text-white font-semibold">
                  Stay fit and healthy
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  with our custom
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  fitness tracker platform
                </h1>
                <p className="my-5 text-sm md:text-base font-normal pr-0 md:pr-64 text-white">
                  Our experienced trainers will work with you to create
                  personalized workout classes that fit your schedule, fitness
                  level, and objectives.
                </p>
                <Link to="/services" className="btn bg-[#771333] text-white">
                  Explore Classes
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero custom-hero-height"
            style={{
              backgroundImage: `url(${banner2})`,
            }}
          >
            <div className="hero-overlay custom-hero-overlay bg-[#080303] bg-opacity-65"></div>
            <div className="hero-content text-neutral-content">
              <div className="max-w-max text-center md:text-left">
                <h1 className="md:text-5xl text-2xl pb-2 text-white font-semibold">
                  Stay fit and healthy
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  with our custom
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  fitness tracker platform
                </h1>
                <p className="my-5 text-sm md:text-base font-normal pr-0 md:pr-64 text-white">
                  Our experienced trainers will work with you to create
                  personalized workout classes that fit your schedule, fitness
                  level, and objectives.
                </p>
                <Link to="/services" className="btn bg-[#771333] text-white">
                  Explore Classes
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero custom-hero-height"
            style={{
              backgroundImage: `url(${banner3})`,
            }}
          >
            <div className="hero-overlay custom-hero-overlay bg-[#080303] bg-opacity-65"></div>
            <div className="hero-content text-neutral-content">
              <div className="max-w-max text-center md:text-left">
                <h1 className="md:text-5xl text-2xl pb-2 text-white font-semibold">
                  Stay fit and healthy
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  with our custom
                </h1>
                <h1 className="md:text-5xl pb-2 text-2xl text-white font-semibold">
                  fitness tracker platform
                </h1>
                <p className="my-5 text-sm md:text-base font-normal pr-0 md:pr-64 text-white">
                  Our experienced trainers will work with you to create
                  personalized workout classes that fit your schedule, fitness
                  level, and objectives.
                </p>
                <Link to="/services" className="btn bg-[#771333] text-white">
                  Explore Classes
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner;
