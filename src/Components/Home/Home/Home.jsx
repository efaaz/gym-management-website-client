import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeatureSection from "../FeaturedSection/FeatureSection";
import AboutSection from "../AboutSection/AboutSection";
import FeaturedClasses from "../FeaturedClasses/FeaturedClasses";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import LatestCommunityPosts from "../LatestCommunityPosts/LatestCommunityPosts";
import NewsLetter from "../NewsLetter/NewsLetter";
import TrainerCard from "../TrainerCard/TrainerCard";
import TeamSection from "../TeamSection/TeamSection";

function Home() {
  return (
    <>
      <Helmet>
        <title>Aura Fitness | Home</title>
      </Helmet>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <AboutSection></AboutSection>
      <FeaturedClasses></FeaturedClasses>
      <ReviewSlider></ReviewSlider>
      <LatestCommunityPosts></LatestCommunityPosts>
      <NewsLetter></NewsLetter>
      <TeamSection></TeamSection>
    </>
  );
}

export default Home;
