import React from "react";
import aboutImage from "../../../assets/AboutUs/about.png" ; // Assuming you have an image for the About section
import SectionTitle from "../../Common/SectionTitle/SectionTitle";

const AboutSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <SectionTitle title="About Us" />
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <img
            src={aboutImage}
            alt="About Us"
            className="rounded-lg shadow-lg mx-auto w-[80%]"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <p className="mb-6 text-gray-400 text-base sm:text-lg">
            Welcome to our fitness community! We are dedicated to helping you
            achieve your health and fitness goals through a variety of resources
            and support. Our organization offers a wide range of services
            including personal training, nutrition guidance, and community
            support to ensure you have everything you need to succeed.
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            Our mission is to inspire and empower individuals to lead healthier
            and happier lives. Whether you are a beginner or an experienced
            fitness enthusiast, our team of experts is here to guide you every
            step of the way. Join us on this journey to a better you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
