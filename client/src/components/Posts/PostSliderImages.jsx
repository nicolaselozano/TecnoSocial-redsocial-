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
          <ImageWithLoading src={image?.url} alt={image?.alt} />
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

const ImageWithLoading = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] min-w-[500px]">
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <img
        src={src}
        alt={alt || "Imagen no encontrada"}
        onLoad={(e) => {
          setLoading(false);
          e.target.style.opacity = 1;
          e.target.style.transform = "translateY(0)";
        }}
        onError={(e) => {
          setLoading(false);

          e.target.alt = "Imagen no encontrada";
        }}
        className={`rounded-md max-w-full max-h-full opacity-0 translate-y-4 transition-all duration-700 ease-in-out ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          display: loading ? "none" : "block",
        }}
      />
    </div>
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
};

ImageWithLoading.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
