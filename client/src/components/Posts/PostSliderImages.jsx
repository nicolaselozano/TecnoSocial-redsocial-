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

export const PostSliderImages = ({ images, loading }) => {
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
      {images?.map((image) => (
        <SwiperSlide
          key={image.id}
          className="flex items-center justify-center"
        >
          <div className="flex items-center justify-center w-full h-full">
            {loading && (
              <div className="flex items-center justify-center w-full h-full">
                <Skeleton className="w-full h-full" />
              </div>
            )}
            <img
              src={image?.url}
              alt={image?.alt}
              style={loading ? {} : { display: "block" }}
              onLoad={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = "translateY(0)";
              }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400x300")
              }
              className="rounded-md max-w-full max-h-full opacity-0 translate-y-4 transition-all duration-700 ease-in-out"
            />
          </div>
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
      id: PropTypes.number,
      url: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};
