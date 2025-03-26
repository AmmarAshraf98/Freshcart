import Slider from "react-slick";
import img1 from "../../images/slider-image-1.jpeg";
import img3 from "../../images/slider-image-3.jpeg";
import "./MainSlider.css";
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8 p-0">
            <Slider {...settings}>
              <img src={img1} alt="" />
              <img src={img3} alt="" />
            </Slider>
          </div>
          <div className="col-md-4 p-0 hide-md">
            <img src={img1} className="w-100" alt="slider content" />
            <img src={img3} className="w-100" alt="slider content" />
          </div>
        </div>
      </div>
    </>
  );
}
