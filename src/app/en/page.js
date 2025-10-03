import SliderImage from "../component/common/SliderImage";
import AllVisiten from "../component/en/common/AllVisiten";
import BlogPageen from "../component/en/common/BlogPageen";
import FamousPlacesen from "../component/en/common/FamousPlacesen";
import PromotionEn from "../component/en/common/PromotionEn";
import VideoPageen from "../component/en/common/VideoPageen";
import ImageMapen from "../component/en/ImageMapen";

// app/en/page.jsx
export default function EnHome() {
  return (
    <>
    <div 
  className=" mt-0"
  style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}>
    <SliderImage/>
    <ImageMapen/>
    <FamousPlacesen/>
    <div id='sken'><PromotionEn/></div>
    <AllVisiten/>
    <div id="blogen">
      <BlogPageen/>
    </div>
    <VideoPageen/>
   
    </div>
    </>
  );
}
