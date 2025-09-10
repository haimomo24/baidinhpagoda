import HeaderBookingvi from "../component/common/HeaderBookingvi";
import SliderImage from "../component/common/SliderImage";
import VideoPage from "../component/common/VideoPage";
import AllVisit from "../component/vi/common/AllVisit";
import BlogPage from "../component/vi/common/BlogPage";
import FamousPlaces from "../component/vi/common/FamousPlaces";
import PromotionVi from "../component/vi/common/PromotionVi";
import ImageMapen from "../component/vi/ImageMapvi";

// app/vi/page.jsx
export default function ViHome() {
  return (
  <>
  <div 
  className=" mt-0"
  style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}>
    {/* <HeaderBookingvi/> */}
  <SliderImage/>
  <ImageMapen/>
  <FamousPlaces/>
  <div id='sk'>
    <PromotionVi/>
  </div>
  
  <AllVisit/>
 
   <div id="blog">
        <BlogPage />
      </div>
   <VideoPage/>
  </div>
  
  </>
  );
}
