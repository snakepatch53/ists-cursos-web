import { faCamera, faSave, faSignature } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import Button from "../panel.components/Button";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCourses } from "../services/courses";

export default function Home({ session }) {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        getCourses().then((res) => {
            if (res) {
                const filtered = res.sort((a, b) => b.published - a.published);
                setCourses(filtered.filter((course) => course.teacher_id === session.id));
                // setCourses(filtered);
            }
        });
    }, [session]);

    return (
        <AnimateElement className="flex w-full h-full">
            <div className="w-full h-full max-w-[var(--max-width)] m-auto">
                <div className="flex gap-10 w-full flex-col xl:flex-row">
                    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 w-full">
                        <CardWrapper
                            src={session.photo_url}
                            fileName="photo"
                            inputLabel="Seleccionar Foto"
                        >
                            <Input label="Nombre" name="name" value={session.name} required />
                            <Input
                                label="Apellido"
                                name="lastname"
                                value={session.lastname}
                                required
                            />
                            <Input label="Cédula" name="dni" value={session.dni} required />
                            <Input label="Correo" name="email" value={session.email} required />
                        </CardWrapper>
                        <CardWrapper
                            src={session.signature_url}
                            fileName="signature"
                            inputLabel="Seleccionar Firma"
                            fileAccept="image/png"
                            inputIcon={faSignature}
                        >
                            <Input label="Privilegio" name="role" value={session.role} disabled />
                            <Input label="Facebook URL" name="facebook" value={session.facebook} />
                            <Input label="Contraseña" name="password" type="password" />
                            <Input
                                label="Confirmar Contraseña"
                                name="confirm_password"
                                type="password"
                            />
                        </CardWrapper>
                        <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center p-5 bg-white rounded-lg shadow-xl">
                            <Input
                                label="Descripción"
                                name="description"
                                value={session.description}
                                type="textarea"
                                classNameWrapper="my-10"
                                classNameSubWrapper="max-w-[760px]"
                            />
                            <Button
                                icon={faSave}
                                text="Guardar Cambios"
                                type="edit"
                                className="w-full max-w-96 py-5 px-10 rounded-full bg-gradient-to-r from-[#037bfd] to-[#00a65a] hover:scale-105"
                                classNameText="text-base font-content2"
                                classNameIcon="text-sm"
                                classNameBeffore="hidden"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:min-w-80 justify-center items-center p-5 bg-white rounded-lg shadow-xl mb-10 xl:mb-0">
                        <h3
                            className="font-title uppercase tracking-widest text-2xl text-[var(--color3-bg)] mb-5"
                            style={{
                                textShadow:
                                    "1px 0 1px var(--color1-bg), -1px 0 1px var(--color1-bg), 0 1px 1px var(--color1-bg), 0 -1px 1px var(--color1-bg)",
                            }}
                        >
                            Mis cursos
                        </h3>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:flex-1 xl:flex xl:flex-col">
                            {courses &&
                                courses.map((course) => (
                                    <CourseItem key={course.id} course={course} />
                                ))}
                            {courses?.length === 0 && (
                                <span className="text-center">No tienes cursos creados..</span>
                            )}
                            {!courses && (
                                <>
                                    <CourseItem load={true} />
                                    <CourseItem load={true} />
                                    <CourseItem load={true} />
                                    <CourseItem load={true} />
                                    <CourseItem load={true} />
                                    <CourseItem load={true} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .panel-page-page {
                    background-color: #ddd !important;
                }
            `}</style>
        </AnimateElement>
    );
}

const CardWrapper = ({
    children,
    src,
    fileName,
    inputLabel = "",
    inputIcon = faCamera,
    fileAccept = "image/jpg",
}) => {
    return (
        <div className="flex flex-col content-center justify-center gap-10 bg-white rounded-lg shadow-xl p-5 py-10">
            <div className="flex content-center justify-center">
                <div className="relative group/img w-full max-w-52 aspect-square rounded-full shadow-xl overflow-hidden">
                    <img
                        src={src}
                        alt={"Imagen de " + fileName}
                        accept={fileAccept}
                        className="w-full h-full object-cover object-center bg-gray-300"
                    />
                    <input type="file" name={fileName} id={fileName} className="hidden" />
                    <label
                        htmlFor={fileName}
                        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-0 max-h-0 overflow-hidden group-hover/img:max-w-52 group-hover/img:max-h-52 opacity-0 group-hover/img:opacity-100 flex flex-col gap-2 justify-center items-center bg-black/50 cursor-pointer duration-100"
                    >
                        <FontAwesomeIcon icon={inputIcon} className="text-3xl text-white" />
                        <span
                            className="text-white"
                            style={{
                                textShadow:
                                    "1px 0 1px #000, -1px 0 1px #000, 0 1px 1px #000, 0 -1px 1px #000",
                            }}
                        >
                            {inputLabel}
                        </span>
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-10">{children}</div>
        </div>
    );
};

const Input = ({
    label,
    type = "text",
    value = "",
    classNameWrapper = "",
    classNameSubWrapper = "",
    required = false,
    disabled = false,
    ...props
}) => {
    const $input = useRef(null);
    useEffect(() => {
        $input.current.value = value;
        haveText({ target: $input.current });
    }, [value]);
    const haveText = ({ target }) => {
        if (target.value.length > 0) target.classList.add("[&+label]:bottom-full");
        else target.classList.remove("[&+label]:bottom-full");
    };
    return (
        <div className={"flex justify-center w-full " + classNameWrapper}>
            <div
                className={
                    "group relative w-full max-w-80 border-b border-solid border-gray-300 " +
                    classNameSubWrapper
                }
            >
                <input
                    type={type}
                    {...props}
                    className={
                        "w-full [&:focus+label]:bottom-full " +
                        (disabled ? "opacity-70 hover:cursor-not-allowed" : "")
                    }
                    onInput={haveText}
                    ref={$input}
                    required={required}
                    disabled={disabled}
                />
                <label className="absolute left-0 bottom-0 group-hover:bottom-full opacity-50">
                    {label}
                    {required && <span className="text-red-500">*</span>}:{" "}
                </label>
            </div>
        </div>
    );
};

const CourseItem = ({ course, load = false }) => {
    if (!load)
        return (
            <div className="flex flex-col sm:flex-row w-full gap-2 p-2 sm:h-24 bg-gray-200 xl:bg-transparent xl:hover:bg-gray-200 hover:shadow-lg rounded-lg">
                <div className="h-full aspect-video bg-gray-300 overflow-hidden rounded-lg">
                    <img
                        src={course.image_url}
                        alt="Imagen del curso"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-center text-xs">
                    <h4 className="font-bold text-sm">{course.name}</h4>
                    <span>{course?.quota - course?.inscriptions?.length} cupos</span>
                    <span>{course?.inscriptions?.length} inscritos</span>
                    <div className="flex items-center gap-1">
                        <span
                            className={
                                "block w-[5px] aspect-square rounded-full " +
                                (course.published ? "bg-green-500" : "bg-red-500")
                            }
                        />
                        <span>{course.published ? "Publicado" : "En revisión"}</span>
                    </div>
                </div>
            </div>
        );
    return (
        <div className="relative flex flex-col sm:flex-row w-full gap-2 p-2 sm:h-24 rounded-lg">
            <div className="brigth-animation absolute inset-0 rounded-lg" />
            <div className="h-full aspect-video bg-gray-300 overflow-hidden rounded-lg" />
            <div className="flex-1 flex flex-col gap-1 justify-center text-xs">
                <div className="w-full h-4 font-bold text-sm bg-gray-300 rounded-full mb-1" />
                <div className="w-[80%] h-2 font-bold text-sm bg-gray-300 rounded-full" />
                <div className="w-[80%] h-2 font-bold text-sm bg-gray-300 rounded-full" />
            </div>
        </div>
    );
};
