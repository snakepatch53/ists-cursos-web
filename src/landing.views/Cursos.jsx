import "./Cursos.css";
// import cursos from "./../mooks/cursos.json";
import CursosList from "../landing.components/CursosList";
import AnimateElement from "../components/AnimateElement";
import { useEffect } from "react";

export default function Cursos({ courses }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <AnimateElement>
            <section className="cursos-page bg-menu"></section>
            <CursosList id="section-proximos" cursos={courses} title="Próximos" />
            <CursosList id="section-concluidos" cursos={courses} title="Concluidos" />
            <CursosList id="section-en-progreso" cursos={courses} title="En Progreso" />
        </AnimateElement>
    );
}
