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
        // window.scrollTo(0, 0);
        getUsers().then((res) => setUsers(res));
    }, []);

    return (
        <AnimateElement className="flex flex-col justify-center items-center text-center">
            <SectionTitle
                icon={faPeopleGroup}
                title="Nuestro Equipo"
                description="Nuestro equipo esta conformado por profesionales de diferentes áreas y con diferentes experiencias, pero con un objetivo en común: ayudar a las personas a mejorar su calidad de vida a través de la educación."
                className="pt-28 pb-10"
                dark={true}
            />

            <section className="flex justify-center p-[var(--padding)] w-full">
                <div className="w-full max-w-[var(--max-width)] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

            <SectionTitle
                icon={faHistory}
                title="Nuestros Conceptos"
                description="Somos un equipo altamente capacitado para enseñar acerca de areas en tendencia y de alta demanda."
            />

            <section className="flex justify-center w-full p-[var(--padding)]">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="flex-1 flex flex-col gap-10">
                        <h4 className="text-xl font-title2">MISIÓN</h4>
                        <p className="font-content2 text-balance opacity-85">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                            laboriosam sint ullam doloremque optio recusandae unde at fugiat vitae
                            amet neque suscipit voluptatibus, consectetur tenetur qui quibusdam!
                            Architecto corporis eaque in dignissimos numquam dolorum. Voluptatum
                            modi, minima soluta voluptas voluptate placeat. Quam laboriosam illo
                            sapiente soluta, dicta cum maiores culpa!
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-10">
                        <h4 className="text-xl font-title2">VISIÓN</h4>
                        <p className="font-content2 text-balance opacity-85">
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
