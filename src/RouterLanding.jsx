import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contacts from "./landing.views/Contacts";
import Home from "./landing.views/Home";
import Header from "./landing.components/Header";
import Footer from "./landing.components/Footer";
import Cursos from "./landing.views/Cursos";
import Nosotros from "./landing.views/Nosotros";
import Certificados from "./landing.views/Certificados";
import NotFound from "./views/NotFound";
import { useEffect, useState } from "react";
import { getSocialNetworks } from "./services/social-networks";
import CursoInfo from "./landing.views/CursoInfo";
import { getCourses } from "./services/courses";
import { getImages } from "./services/images";

export default function RouterLanding() {
    const [socials, setSocials] = useState([]);
    const [courses, setCourses] = useState(null);
    const [images, setImages] = useState(null);

    useEffect(() => {
        getCourses().then((res) => setCourses(res));
        getImages().then((res) => setImages(res));
        getSocialNetworks().then((res) => setSocials(res));
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home courses={courses} images={images} />} />
                <Route path="/contactos" element={<Contacts socials={socials} />} />
                <Route path="/cursos" element={<Cursos courses={courses} />} />
                <Route path="/curso/:id" element={<CursoInfo courses={courses} />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/certificados" element={<Certificados />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer socials={socials} />
        </Router>
    );
}
