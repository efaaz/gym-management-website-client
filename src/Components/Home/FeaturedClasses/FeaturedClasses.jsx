import React from "react";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import ClassCard from "../../Common/ClassCard/ClassCard";

const classesData = [
  {
    id: "1",
    title: "Yoga for Beginners",
    description: "A gentle introduction to yoga for beginners.",
    bookings: 120,
  },
  {
    id: "2",
    title: "Advanced Pilates",
    description: "Challenge yourself with advanced Pilates moves.",
    bookings: 85,
  },
  {
    id: "3",
    title: "HIIT Workout",
    description: "High-Intensity Interval Training to burn calories fast.",
    bookings: 200,
  },
  {
    id: "4",
    title: "Zumba Dance",
    description: "Fun and energetic dance workout.",
    bookings: 150,
  },
  {
    id: "5",
    title: "Strength Training",
    description: "Build muscle and increase strength.",
    bookings: 130,
  },
  {
    id: "6",
    title: "Cardio Blast",
    description: "Cardio exercises to boost your heart rate.",
    bookings: 110,
  },
  {
    id: "7",
    title: "CrossFit",
    description: "Intense workout combining strength and cardio.",
    bookings: 90,
  },
  {
    id: "8",
    title: "Barre Workout",
    description: "A fusion of Pilates, dance, and yoga.",
    bookings: 70,
  },
  {
    id: "9",
    title: "Kickboxing",
    description: "High-energy martial arts-inspired workout.",
    bookings: 140,
  },
  {
    id: "10",
    title: "Aqua Aerobics",
    description: "Low-impact water workout.",
    bookings: 65,
  },
  {
    id: "11",
    title: "Cycling",
    description: "Indoor cycling for endurance and strength.",
    bookings: 95,
  },
  {
    id: "12",
    title: "Meditation and Relaxation",
    description: "Calm your mind and reduce stress.",
    bookings: 80,
  },
  {
    id: "13",
    title: "Bootcamp",
    description: "Intense military-style workout.",
    bookings: 75,
  },
  {
    id: "14",
    title: "TRX Suspension Training",
    description: "Total body resistance exercise using TRX straps.",
    bookings: 60,
  },
  {
    id: "15",
    title: "Power Yoga",
    description: "Dynamic and physically demanding yoga.",
    bookings: 50,
  },
];

const FeaturedClasses = () => {
  // Sort classes by bookings in descending order and take the top 6
  const topClasses = classesData.sort((a, b) => b.bookings - a.bookings).slice(0, 6);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <SectionTitle title="Featured Classes" />
      <p className="text-center text-gray-400 mb-12">Our most popular classes based on bookings</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topClasses.map((classItem) => (
          <ClassCard
            key={classItem.id}
            title={classItem.title}
            description={classItem.description}
            bookings={classItem.bookings}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
