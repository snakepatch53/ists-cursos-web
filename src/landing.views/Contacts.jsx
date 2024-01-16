import AnimateElement from "../components/AnimateElement";
import SectionTitle from "../landing.components/SectionTitle";
import { faMessage, faNetworkWired, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// import redes from "./../mooks/redes-sociales.json";
import SocialNetworkLink from "../landing.components/SocialNetworkLink";

import Button from "../landing.components/Button";
import InputForm from "../landing.components/InputForm";
import { useEffect, useRef, useState } from "react";
import { formdataToObject, isEmail, isValidateRequired } from "../utils/validations";
import { Notification, showNotification } from "../panel.components/Notification";
import { storageMailboxe } from "../services/mailboxes";
import CrudProgress from "../panel.components/CrudProgress";

export default function Contacts({ socials }) {
    const $form = useRef(null);
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if ($form?.current) {
        const $_form = $form.current;
        $_form.onsubmit = (e) => {
            e.preventDefault();
            if (!isValidateRequired($_form).isValidate) {
                return showNotification({
                    title: "Error de validación",
                    message: "Por favor, complete todos los campos.",
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
            setProgress(true);
            const data = formdataToObject(new FormData($_form));
            storageMailboxe({ data }).then((res) => {
                setProgress(false);
                if (res.success) {
                    $_form.reset();
                    return showNotification({
                        title: "Mensaje enviado",
                        message: "Gracias por contactarnos.",
                        type: "success",
                    });
                }
                return showNotification({
                    title: "Error desde el servidor",
                    message: res.message || "No se pudo enviar el mensaje.",
                    type: "danger",
                });
            });
        };
    }

    return (
        <>
            <AnimateElement>
                <Notification />
                <svg className="fill-[var(--color1-bg)] min-h-36 w-full" viewBox="0 0 1440 260">
                    <path d="M0,192L60,176C120,160,240,128,360,117.3C480,107,600,117,720,149.3C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
                <div className="contact-page">
                    <SectionTitle
                        title="Nuestras redes"
                        icon={faNetworkWired}
                        description="Nuestro equipo esta conformado por profesionales de
                        diferentes áreas y con diferentes experiencias, pero con un
                        objetivo en común: ayudar a las personas a mejorar su
                        calidad de vida a través de la educación."
                    />
                    <section className="flex w-full my-10">
                        <div className="flex gap-2 md:gap-5 w-full justify-center py-16 overflow-hidden">
                            {socials.map((red) => (
                                <SocialNetworkLink key={red.id} style="2" {...red} />
                            ))}
                        </div>
                    </section>
                    <SectionTitle
                        icon={faMessage}
                        title="Contáctanos"
                        description="Si tienes alguna pregunta o duda envianos un mensaje."
                    />
                    <section className="flex justify-center p-[var(--padding)] w-full">
                        <div className="flex justify-center items-center w-full max-w-[var(--max-width)]">
                            <form
                                ref={$form}
                                onSubmit={(e) => e.preventDefault()}
                                className="flex flex-col justify-center items-center w-full max-w-[650px] gap-5"
                                noValidate
                            >
                                <InputForm
                                    name="name"
                                    labelText="Nombres y Apellidos"
                                    placeholder="Escribe tus nombres.."
                                    required
                                />
                                <InputForm
                                    name="phone"
                                    labelText="Numero de Celular"
                                    placeholder="Escribe tu número.."
                                    required
                                />
                                <InputForm
                                    name="email"
                                    labelText="Correo Electrónico"
                                    placeholder="Escribe tu email.."
                                    required
                                />
                                <InputForm
                                    type="textarea"
                                    name="message"
                                    labelText="Mensaje"
                                    placeholder="Escribe tu mensaje.."
                                    required
                                />
                                <Button text="Enviar" _type="submit" icon={faPaperPlane} />
                            </form>
                        </div>
                    </section>
                </div>
            </AnimateElement>
            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </>
    );
}
