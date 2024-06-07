import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TrainerCard from "../TrainerCard/TrainerCard";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";

const fetchTrainers = async () => {
    const response = await axios.get("http://localhost:5000/trainers"); // Replace with your API endpoint
    return response.data;
  };

function AllTrainer() {
    const { data: trainers, error, isLoading } = useQuery({
        queryKey: ["trainers"],
        queryFn: fetchTrainers,
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error loading trainers</div>;
    
      return (
        <div className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <SectionTitle title="Meet Our Trainers" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {trainers.map((trainer) => (
                <TrainerCard
                  key={trainer.id}
                  name={trainer.name}
                  photo={trainer.photo}
                  experience={trainer.experience}
                  social={trainer.social}
                  availableSlots={trainer.availableSlots}
                  bio={trainer.bio}
                  expertise={trainer.expertise}
                />
              ))}
            </div>
          </div>
        </div>
      );
    };

export default AllTrainer