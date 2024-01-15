import CursoItem from "./CursoItem";

import "./CursosList.css";
import Title from "./Title";

export default function CursosList({ cursos, title, className = "", id = "" }) {
    return (
        <section id={id} className={"cursos-list " + className}>
            <div className="container">
                <Title text={title} />
                <div className="cursos">
                    {cursos &&
                        cursos.map(({ ...props }) => (
                            <CursoItem key={props.id} to={"/curso/" + props.id} {...props} />
                        ))}
                    {!cursos && (
                        <div className="cursos">
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                            <CursoItem load={true} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
