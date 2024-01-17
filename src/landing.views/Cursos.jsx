import "./Cursos.css";
// import cursos from "./../mooks/cursos.json";
import CursosList from "../landing.components/CursosList";
import AnimateElement from "../components/AnimateElement";
import { useEffect, useState } from "react";

export default function Cursos({ courses }) {
    const [disponibles, setDisponibles] = useState(null);
    const [progreso, setProgreso] = useState(null);
    const [concluidos, setConcluidos] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!courses) return;
        const _disponibles = courses.filter(
            (curso) => curso.published && !curso.course_finished && !curso.course_started
        );
        setDisponibles(_disponibles);

        const _progreso = courses.filter(
            (curso) => curso.published && curso.course_started && !curso.course_finished
        );
        setProgreso(_progreso);

        const _concluidos = courses.filter((curso) => curso.published && curso.course_finished);
        setConcluidos(_concluidos);
    }, [courses]);

    return (
        <AnimateElement>
            <section className="cursos-page bg-menu"></section>
            <CursosList id="section-proximos" cursos={disponibles} title="Disponibles" />
            <CursosList id="section-concluidos" cursos={progreso} title="En curso" />
            <CursosList id="section-en-progreso" cursos={concluidos} title="Concluidos" />
        </AnimateElement>
    );
}
