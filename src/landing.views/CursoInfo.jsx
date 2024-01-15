import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateElement from "../components/AnimateElement";
import "./CursoInfo.css";
import {
    faCalendarDays,
    faClock,
    faPaperPlane,
    faPen,
    faTicket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../views/NotFound";
import EquipoItem from "../landing.components/EquipoItem";
import InputForm from "../landing.components/InputForm";
import Button from "../landing.components/Button";
import SectionTitle from "../landing.components/SectionTitle";
import Loading from "../components/Loading";
import Title from "../landing.components/Title";

export default function CursoInfo({ courses }) {
    const [curso, setCurso] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        const course = courses?.find((course) => course.id === parseInt(id));
        if (course) setCurso(course);
    }, [courses, id]);

    if (curso == null) return <Loading />;
    if (!curso) return <NotFound />;
    return (
        <AnimateElement>
            <Banner curso={curso} />
            <Resnponsibles responsible={curso?.responsible} teacher={curso?.teacher} />
            <FormInscription />
        </AnimateElement>
    );
}

function Banner({ curso }) {
    return (
        <section className="banner">
            <div className="curso-info-container container">
                <div className="curso-info">
                    <img src={curso.image_url} className="aspect-video object-cover" />
                    <div className="description">
                        <h3>{curso.name}</h3>
                        <p>{curso.description}</p>
                        <div className="datos">
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <span>{curso.date_start_formatted}</span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faClock} />
                                <span>{curso.duration} horas</span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{curso?.inscriptions?.length} estudiantes</span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faTicket} />
                                <span>{curso?.quota - curso?.inscriptions?.length} cupos</span>
                            </div>
                        </div>
                        <a href="#section-inscription">Inscribirme</a>
                        <span>Empienza en: 5D 22H 0M 0S</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Resnponsibles({ responsible, teacher }) {
    return (
        <div className="page-curso-info">
            <section className="section-team">
                <Title text="Docentes Encargados" />
                <div className="container">
                    {teacher && (
                        <EquipoItem
                            name={teacher.name}
                            role="Profesor"
                            photo_url={teacher.photo_url}
                            description={teacher.description}
                            facebook={teacher.facebook}
                        />
                    )}

                    {responsible && (
                        <EquipoItem
                            name={responsible.name}
                            role="Responsable"
                            photo_url={responsible.photo_url}
                            description={responsible.description}
                            facebook={responsible.facebook}
                        />
                    )}
                    {!teacher && <EquipoItem load />}
                    {!responsible && <EquipoItem load />}
                </div>
            </section>
            <section className="section-title">
                <div className="container">
                    <SectionTitle
                        icon={faPen}
                        title="Inscribete"
                        description="LLena el formularion con tus datos personales."
                    />
                </div>
            </section>
        </div>
    );
}

function FormInscription() {
    return (
        <section className="inscription" id="section-inscription">
            <div className="container">
                <form className="flex flex-col gap-4 w-full max-w-[550px]">
                    <InputForm name="name" labelText="Cedula" placeholder="Escribe tu cedula.." />
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputForm
                            name="name"
                            labelText="Nombres "
                            placeholder="Escribe tus nombres.."
                        />
                        <InputForm
                            name="name"
                            labelText="Apellidos"
                            placeholder="Escribe tus apellidos.."
                        />
                    </div>
                    <InputForm
                        name="name"
                        labelText="Correo electronico"
                        placeholder="Escribe tu correo electronico.."
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <InputForm
                            name="sex"
                            labelText="Sexo"
                            radioOptions={[
                                { value: "Masculino", label: "Masculino" },
                                { value: "Femenino", label: "Femenino" },
                                { value: "Otro", label: "Otro" },
                            ]}
                            type="radio"
                        />
                        <InputForm
                            name="instruction"
                            labelText="Instrucción"
                            radioOptions={[
                                { value: "Basica", label: "Basica" },
                                { value: "Media", label: "Media" },
                                { value: "Tecnica", label: "Tecnica" },
                                { value: "Superior", label: "Superior" },
                            ]}
                            type="radio"
                        />
                    </div>

                    <InputForm
                        name="name"
                        labelText="Direccion"
                        placeholder="Escribe tu direccion.."
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputForm
                            name="name"
                            labelText="Telefono"
                            placeholder="Escribe tu numero telefonico.."
                        />
                        <InputForm
                            name="name"
                            labelText="Celular"
                            placeholder="Escribe tu numero de celular.."
                        />
                    </div>
                    <InputForm
                        name="name"
                        labelText="Descripcion"
                        type="textarea"
                        placeholder="Describete.."
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputForm
                            name="name"
                            labelText="Nombre/Empresa"
                            placeholder="Escribe el nombre de su empresa.."
                        />
                        <InputForm
                            name="name"
                            labelText="Telefono/Empresa "
                            placeholder="Escribe el numero telefonico de la empresa.."
                        />
                    </div>
                    <InputForm
                        name="name"
                        labelText="Direccion/Empresa"
                        placeholder="Escribe la direcion de la empresa.."
                    />

                    <Button text="Enviar" icon={faPaperPlane} />
                </form>
            </div>
        </section>
    );
}
