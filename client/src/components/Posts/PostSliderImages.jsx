import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { GrPrevious, GrNext } from "react-icons/gr";

// Skeleton loader
const Skeleton = () => (
  <div className="w-full h-52 bg-neutral-700 animate-pulse rounded-md"></div>
);

export const PostSliderImages = ({ images }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper rounded-md"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id} className="flex items-center justify-center"> 
          {loading && <Skeleton />}
          <img
            src={image.url}
            alt={image.alt}
            style={loading ? { display: "none" } : {}}
            onLoad={handleImageLoad}
            className="rounded-md" 
          />
        </SwiperSlide>
      ))}

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev text-primaryGreen-400">
        <GrPrevious />
      </div>
      <div className="swiper-button-next text-primaryGreen-400">
        <GrNext />
      </div>
    </Swiper>
  );
};

PostSliderImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
};
