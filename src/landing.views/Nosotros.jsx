import "./Nosotros.css";
import AnimateElement from "../components/AnimateElement";
import EquipoItem from "../landing.components/EquipoItem";

// import team from "./../mooks/team.json";
import { faHistory, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "../landing.components/SectionTitle";
import { getUsers } from "../services/users";
import { useEffect, useState } from "react";

export default function Cursos() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUsers().then((res) => setUsers(res));
    }, []);

    return (
        <AnimateElement className="nosotros-page">
            <section className="section-title">
                <br />
                <br />
                <br />
                <div className="container">
                    <SectionTitle
                        icon={faPeopleGroup}
                        title="Nuestro Equipo"
                        description="Nuestro equipo esta conformado por profesionales de diferentes áreas y con diferentes experiencias, pero con un objetivo en común: ayudar a las personas a mejorar su calidad de vida a través de la educación."
                    />
                </div>
            </section>

            <section className="section-team">
                <div className="container">
                    {users && users.map((people) => <EquipoItem key={people.id} {...people} />)}
                    {!users && (
                        <>
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                            <EquipoItem load />
                        </>
                    )}
                </div>
            </section>

            <section className="section-title">
                <div className="container">
                    <SectionTitle
                        icon={faHistory}
                        title="Nuestros Conceptos"
                        description="Somos un equipo altamente capacitado para enseñar acerca de areas en tendencia y de alta demanda."
                    />
                </div>
            </section>

            <section className="section-concepts">
                <div className="container">
                    <div className="col">
                        <h4>MISIÓN</h4>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                            laboriosam sint ullam doloremque optio recusandae unde at fugiat vitae
                            amet neque suscipit voluptatibus, consectetur tenetur qui quibusdam!
                            Architecto corporis eaque in dignissimos numquam dolorum. Voluptatum
                            modi, minima soluta voluptas voluptate placeat. Quam laboriosam illo
                            sapiente soluta, dicta cum maiores culpa!
                        </p>
                    </div>
                    <div className="col">
                        <h4>VISIÓN</h4>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                            laboriosam sint ullam doloremque optio recusandae unde at fugiat vitae
                            amet neque suscipit voluptatibus, consectetur tenetur qui quibusdam!
                            Architecto corporis eaque in dignissimos numquam dolorum. Voluptatum
                            modi, minima soluta voluptas voluptate placeat. Quam laboriosam illo
                            sapiente soluta, dicta cum maiores culpa!
                        </p>
                    </div>
                </div>
            </section>
        </AnimateElement>
    );
}
