import SliderImage from "../component/common/SliderImage";
import AllVisit from "../component/vi/common/AllVisit";
import BlogPage from "../component/vi/common/BlogPage";
import FamousPlaces from "../component/vi/common/FamousPlaces";
import PromotionVi from "../component/vi/common/PromotionVi";
import ImageMapen from "../component/vi/ImageMapvi";

// app/vi/page.jsx
export default function ViHome() {
  return (
  <>
  <SliderImage/>
  <ImageMapen/>
  <FamousPlaces/>
  <PromotionVi/>
  <AllVisit/>
 
   <BlogPage/>
  </>
  );
}
