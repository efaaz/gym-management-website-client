import React from "react";
import TrainerCard from "../TrainerCard/TrainerCard";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";

const trainers = [
  {
    id: 1,
    name: "John Doe",
    bio: "John is a certified personal trainer with over 10 years of experience in the fitness industry. He specializes in strength training and conditioning.",
    expertise: "Strength Training, Conditioning",
    photo: "https://images.pexels.com/photos/20400626/pexels-photo-20400626/free-photo-of-portrait-of-man-in-unzipped-black-shirt.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Jane is a yoga instructor and nutrition coach. She has been helping clients achieve their health goals through personalized yoga sessions and nutrition plans.",
    expertise: "Yoga, Nutrition",
    photo: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    name: "Mark Johnson",
    bio: "Mark is a professional fitness coach who focuses on cardiovascular training and endurance building. He has worked with numerous athletes to enhance their performance.",
    expertise: "Cardiovascular Training, Endurance",
    photo: "https://images.pexels.com/photos/20400632/pexels-photo-20400632/free-photo-of-portrait-of-man-in-tank-top-at-gym.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const TeamSection = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <SectionTitle title="Meet Our Trainers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              name={trainer.name}
              bio={trainer.bio}
              expertise={trainer.expertise}
              photo={trainer.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
