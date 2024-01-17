import Slider from "../landing.components/Slider";
import "./Home.css";
// import images from "./../mooks/images.json";
// import cursos from "./../mooks/cursos.json";
import AnimateElement from "../components/AnimateElement";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CursoItem from "../landing.components/CursoItem";
import Title from "../landing.components/Title";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import Loading from "../components/Loading";

export default function Home({ courses, images }) {
    const [disponibles, setDisponibles] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!courses) return;
        const _disponibles = courses.filter(
            (curso) => curso.published && !curso.course_finished && !curso.course_started
        );
        setDisponibles(_disponibles);
    }, [courses]);
    // if (courses == null) return <Loading />;

    return (
        <AnimateElement>
            <section className="banner">
                <div className="container">
                    <div className="col">
                        <h2 className="text-3xl font-title">La tecnología es el futuro</h2>
                        <span className="text-xl font-title2">¡Y tu lo eres junto a ella!</span>
                        <p>Si puedes pensarlo, puedes programarlo</p>
                    </div>
                    <div className="col">
                        <div className="slider-container">
                            {images && <Slider speed="1500" delay="5000" images={images} />}
                            {!images && (
                                <AnimateElement className="slider w-full aspect-square rounded-3xl overflow-hidden p-16 bg-black/10">
                                    <img
                                        src="/img/slider.jpg"
                                        alt="Imagen de estudiante en la PC"
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </AnimateElement>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full my-20">
                <Title text="Algunos de nuestros Cursos" className="mb-10" />
                {disponibles && (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        modules={[Autoplay]}
                        autoplay={{ delay: 1000, reverseDirection: true }}
                        speed={3000}
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            500: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 4 },
                        }}
                        grabCursor={true}
                        className="w-full max-w-[var(--max-width)] pb-10"
                    >
                        {disponibles.map((item) => (
                            <SwiperSlide key={item.id} className="w-full">
                                <CursoItem to={"/curso/" + item.id} {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {disponibles && (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        modules={[Autoplay]}
                        autoplay={{ delay: 1000 }}
                        speed={3000}
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            500: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 4 },
                        }}
                        grabCursor={true}
                        className="w-full max-w-[var(--max-width)] pb-10"
                    >
                        {disponibles.map((item) => (
                            <SwiperSlide key={item.id} className="w-full">
                                <CursoItem to={"/curso/" + item.id} {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {!disponibles && (
                    <div className="container grid gap-8 grid-cols-1 sm:gridl-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                        <CursoItem load />
                    </div>
                )}

                <div className="container flex justify-center pt-10">
                    <Link
                        to="/cursos"
                        className="max-w-96 rounded-full py-3 px-5 flex items-center gap-2 text-md bg-[var(--color1-bg)] text-[var(--color1-txt)] hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Ver todos los Cursos
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>
                </div>
            </div>
        </AnimateElement>
    );
}
