import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateElement from "../components/AnimateElement";
import "./CursoInfo.css";
import {
    faCalendarDays,
    faCircleCheck,
    faClock,
    faPaperPlane,
    faPen,
    faTicket,
    faTimes,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NotFound from "../views/NotFound";
import EquipoItem from "../landing.components/EquipoItem";
import InputForm from "../landing.components/InputForm";
import Button from "../landing.components/Button";
import SectionTitle from "../landing.components/SectionTitle";
import Loading from "../components/Loading";
import Title from "../landing.components/Title";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
    formdataToObject,
    isCedula,
    isEmail,
    isValidateRequired,
    setValuesForm,
} from "../utils/validations";
import { showStudent } from "../services/students";
import CrudProgress from "../panel.components/CrudProgress";
import { Notification, showNotification } from "../panel.components/Notification";
import { enrollRegisterStudentOrNot } from "../services/inscriptions";

export default function CursoInfo({ courses }) {
    let cupos_disponibles = useRef(0);

    const [curso, setCurso] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        const course = courses?.find((course) => course.id === parseInt(id));
        if (course) {
            setCurso(course);
            cupos_disponibles.current = course?.quota - course?.inscriptions?.length;
        }
    }, [courses, id]);

    if (curso == null) return <Loading />;
    if (!curso) return <NotFound />;
    return (
        <AnimateElement>
            <Notification />
            <Banner curso={curso} cuposDisponibles={cupos_disponibles.current} />
            <Resnponsibles responsible={curso?.responsible} teacher={curso?.teacher} />
            {!curso?.course_started && cupos_disponibles.current > 0 && (
                <FormInscription curso={curso} />
            )}
        </AnimateElement>
    );
}

function Banner({ curso, cuposDisponibles }) {
    return (
        <section className="banner">
            <div className="curso-info-container container">
                <div className="curso-info">
                    <img src={curso.image_url} className="aspect-video object-cover" />
                    <div className="description">
                        <h3>{curso.name}</h3>
                        <p className="font-content">{curso.description}</p>
                        <div className="datos">
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <span className="font-content">{curso.date_start_formatted}</span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faClock} />
                                <span className="font-content">{curso.duration} horas</span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="font-content">
                                    {curso?.inscriptions?.length} estudiantes
                                </span>
                            </div>
                            <div className="line"></div>
                            <div className="datos-info">
                                <FontAwesomeIcon icon={faTicket} />
                                <span className="font-content">{cuposDisponibles} cupos</span>
                            </div>
                        </div>
                        {!curso?.course_started && cuposDisponibles > 0 && (
                            <>
                                <a href="#section-inscription">Inscribirme</a>
                                {/* <span>Empienza en: 5D 22H 0M 0S</span> */}
                                <span className="font-content">
                                    Empienza{" "}
                                    {formatDistanceToNow(new Date(curso?.date_start), {
                                        addSuffix: true,
                                        locale: es,
                                    })}
                                </span>
                            </>
                        )}
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
        </div>
    );
}

function FormInscription({ curso }) {
    const $form = useRef(null);
    const [progress, setProgress] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const $_form = e.target;
        if (!isValidateRequired($_form).isValidate) {
            return showNotification({
                title: "Error de validación",
                message: "Por favor, complete todos los campos.",
                type: "warning",
            });
        }
        if (!isCedula($_form.dni.value)) {
            return showNotification({
                title: "Error de validación",
                message: "Por favor, ingrese un numero de cedula valido.",
                type: "warning",
            });
        }
        if (!isEmail($_form.email.value)) {
            return showNotification({
                title: "Error de validación",
                message: "Por favor, ingrese un correo electrónico válido.",
                type: "warning",
            });
        }

        const student = formdataToObject(new FormData($_form));
        const data = { course_id: curso.id, student };
        setProgress(true);
        enrollRegisterStudentOrNot({ data }).then((res) => {
            setProgress(false);
            if (res.success) {
                $_form.reset();
                // mostrar informacion de contacto
                setWelcomeModal(true);
                return showNotification({
                    title: "Inscripción exitosa",
                    message: "Gracias por inscribirte.",
                    type: "success",
                });
            }
            return showNotification({
                title: "Error desde el servidor",
                message: res.message || "No se pudo inscribir.",
                type: "danger",
            });
        });
    };

    const handleChangeDni = (target) => {
        const { value } = target;
        if (isCedula(value)) {
            target.disabled = true;
            setProgress(true);
            const data = { dni: value };
            showStudent({ data }).then((res) => {
                target.disabled = false;
                setProgress(false);
                if (res.success) {
                    setValuesForm(res.data, $form.current);
                }
                target.focus();
            });
        } else {
            $form.current.reset();
        }
    };

    return (
        <>
            <section className="inscription py-0" id="section-inscription">
                <div className="container ">
                    <SectionTitle
                        icon={faPen}
                        title="Inscribete"
                        description="LLena el formularion con tus datos personales."
                        className="py-5"
                    />
                </div>
                <div className="container">
                    <form
                        ref={$form}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full max-w-[550px]"
                        noValidate
                    >
                        <InputForm
                            name="dni"
                            labelText="Cedula"
                            placeholder="Escribe tu cedula.."
                            onChange={handleChangeDni}
                            required
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputForm
                                name="name"
                                labelText="Nombres "
                                placeholder="Escribe tus nombres.."
                                required
                            />
                            <InputForm
                                name="lastname"
                                labelText="Apellidos"
                                placeholder="Escribe tus apellidos.."
                                required
                            />
                        </div>
                        <InputForm
                            name="email"
                            labelText="Correo electronico"
                            placeholder="Escribe tu correo electronico.."
                            required
                        />

                        <div className="flex flex-col md:flex-row gap-4">
                            <InputForm
                                name="sex"
                                labelText="Sexo"
                                radioOptions={[
                                    { value: "Masculino", label: "Masculino", checked: true },
                                    { value: "Femenino", label: "Femenino" },
                                    { value: "Otro", label: "Otro" },
                                ]}
                                type="radio"
                                required
                            />
                            <InputForm
                                name="instruction"
                                labelText="Instrucción"
                                radioOptions={[
                                    { value: "Basica", label: "Basica", checked: true },
                                    { value: "Media", label: "Media" },
                                    { value: "Tecnica", label: "Tecnica" },
                                    { value: "Superior", label: "Superior" },
                                ]}
                                type="radio"
                                required
                            />
                        </div>

                        <InputForm
                            name="address"
                            labelText="Direccion"
                            placeholder="Escribe tu direccion.."
                            required
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputForm
                                name="phone"
                                labelText="Telefono"
                                placeholder="Escribe tu numero telefonico.."
                                required
                            />
                            <InputForm
                                name="cellphone"
                                labelText="Celular"
                                placeholder="Escribe tu numero de celular.."
                                required
                            />
                        </div>
                        <InputForm
                            name="description"
                            labelText="Descripcion"
                            type="textarea"
                            placeholder="Describete.."
                            required
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputForm
                                name="entity_name"
                                labelText="Nombre/Empresa"
                                placeholder="Escribe el nombre de su empresa.."
                                required
                            />
                            <InputForm
                                name="entity_post"
                                labelText="Cargo/Empresa "
                                placeholder="Escribe tu cargo en la empresa.."
                                required
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <InputForm
                                name="entity_phone"
                                labelText="Telefono/Empresa "
                                placeholder="Escribe el numero telefonico de la empresa.."
                                required
                            />
                            <InputForm
                                name="entity_address"
                                labelText="Direccion/Empresa"
                                placeholder="Escribe la direcion de la empresa.."
                                required
                            />
                        </div>

                        <Button text="Enviar" _type="submit" icon={faPaperPlane} />
                    </form>
                </div>
            </section>
            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
            <WelcomeModal
                isOpen={welcomeModal}
                course={curso}
                onClickClose={() => setWelcomeModal(false)}
            />
        </>
    );
}

function WelcomeModal({ isOpen, course, onClickClose }) {
    window.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") onClickClose();
    });
    return (
        <AnimateElement
            className={
                "fixed inset-0 flex justify-center items-center bg-black/50 p-[var(--padding)] " +
                (isOpen ? "" : "hidden")
            }
            onClick={(evt) => {
                if (evt.target === evt.currentTarget) onClickClose();
            }}
        >
            <div className="relative w-full max-w-96 h-full max-h-80 bg-white rounded-lg shadow-xl flex flex-col gap-3 justify-center items-center text-center p-[var(--padding)]">
                <button
                    className="group absolute right-2 top-2 flex justify-center items-center w-8 hover:bg-red-500 aspect-square rounded-sm transition-all duration-300"
                    onClick={onClickClose}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="group-hover:text-white transition-all duration-200"
                    />
                </button>
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-5xl" />
                <h3 className="font-title text-xl">¡Bienvenido!</h3>
                <p className="font-content text-sm">
                    Gracias por inscribirte en el curso de {course.name}. En breve nos comunicaremos
                    contigo para confirmar tu inscripción. Mientras tanto, puedes unirte a nuestro
                    grupo de WhatsApp con:
                </p>
                <a
                    href={course.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-1 text-green-700 fill-green-700 hover:underline"
                >
                    <span className="font-content2 text-base">Enlace de invitación</span>
                    <svg viewBox="0 0 448 512" className="w-4">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                </a>
            </div>
        </AnimateElement>
    );
}
