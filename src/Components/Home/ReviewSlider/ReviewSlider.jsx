import React from "react";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewCard from "../ReviewCard/ReviewCard";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

function ReviewSlider() {
  const axiosPublic = useAxiosPublic();
  const fetchReviews = async () => {
    const { data } = await axiosPublic.get("/review/data");
    return data;
  };

  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  var settings = {
    autoplay: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <div className="slider-container py-12">
      <SectionTitle title="Featured Reviews" />
      <Slider {...settings} className="max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className=" md:px-2 lg:px-4" // Adjust padding based on screen size
          >
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
