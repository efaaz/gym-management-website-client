import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewCard from "../ReviewCard/ReviewCard";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";

const fetchReviews = async () => {
  const { data } = await axios.get("http://localhost:5000/review/data");
  return data;
};

function ReviewSlider() {
  const { data: reviews, error, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  var settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For devices with a screen width of 1024px or less
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // For devices with a screen width of 768px or less
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <div className="slider-container py-12">
      <SectionTitle title="Featured Reviews" />
      <Slider {...settings} className="max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="px-2">
            <ReviewCard
              name={review.name}
              review={review.review}
              image={review.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewSlider;
