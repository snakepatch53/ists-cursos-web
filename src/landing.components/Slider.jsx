// Import Swiper React components
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import AnimateElement from "../components/AnimateElement";

export default function Slider({ speed, delay, images }) {
    return (
        <AnimateElement className="w-full h-full">
            <Swiper
                className="w-full h-full"
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay }}
                speed={speed}
                spaceBetween={0}
                slidesPerView={1}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {images.map(({ id, image_url }) => (
                    <SwiperSlide key={id} className="w-full h-full">
                        <img src={image_url} className="w-full h-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </AnimateElement>
    );
}
