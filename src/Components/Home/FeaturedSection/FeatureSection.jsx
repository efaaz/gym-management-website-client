import React from "react";
import fitnessTrackerIcon from "../../../assets/FeatureSection/fitnessTrackerIcon.png";
import nutritionGuideIcon from "../../../assets/FeatureSection/nutritionGuideIcon.png";
import personalTrainingIcon from "../../../assets/FeatureSection/personalTrainingIcon.png";
import communitySupportIcon from "../../../assets/FeatureSection/communitySupportIcon.png";
import workoutProgramsIcon from "../../../assets/FeatureSection/workoutProgramsIcon.png";
import progressTrackingIcon from "../../../assets/FeatureSection/progressTrackingIcon.png";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="border border-[#981840] p-6 text-center rounded-lg bg-dark-700">
      <img src={icon} alt={title} className="mx-auto mb-4 h-16 w-16" />
      <h3 className="text-xl font-bold text-gray-200">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: fitnessTrackerIcon,
      title: "Fitness Tracker",
      description:
        "Track your fitness journey with our comprehensive tracker that logs your workouts, progress, and milestones.",
    },
    {
      icon: nutritionGuideIcon,
      title: "Nutrition Guide",
      description:
        "Receive personalized nutrition advice to complement your fitness routine and achieve your health goals.",
    },
    {
      icon: personalTrainingIcon,
      title: "Personal Training",
      description:
        "Get access to certified personal trainers who can provide customized workout plans and guidance.",
    },
    {
      icon: communitySupportIcon,
      title: "Community Support",
      description:
        "Join a community of like-minded individuals who share your passion for fitness and healthy living.",
    },
    {
      icon: workoutProgramsIcon,
      title: "Workout Programs",
      description:
        "Explore a variety of workout programs designed to fit different fitness levels and goals.",
    },
    {
      icon: progressTrackingIcon,
      title: "Progress Tracking",
      description:
        "Monitor your progress with detailed analytics and reports to stay motivated and on track.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Our Features" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
