import { Link } from "react-router-dom";
import AnimateElement from "../components/AnimateElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function CursoItem({ load = false, ...props }) {
    return (
        <>
            {!load && <Item {...props} />}
            {load && <Skeleton />}
        </>
    );
}

function Item({ to, image_url, name, teacher, quota, duration }) {
    return (
        <AnimateElement className="w-full h-full">
            <Link
                to={to}
                className="flex flex-col gap-2 w-full h-full p-3 bg-gray-100 rounded-xl hover:shadow-xl  opacity-85 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
                <div className="w-full aspect-video overflow-hidden rounded-xl">
                    <img
                        src={image_url}
                        alt={"Imagen de portada del curso " + name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full flex gap-3">
                    <div className="w-12 pt-1">
                        <div className="w-full aspect-square rounded-full overflow-hidden">
                            <img
                                src={teacher?.photo_url}
                                alt={"Foto del Profesor " + teacher?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h5 className="uppercase font-title leading-4">{name}</h5>
                        <div className="flex gap-2 items-center text-sm">
                            <span className="font-title2 opacity-70">{teacher?.name}</span>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-[0.7rem] text-green-600"
                            />
                        </div>
                        <div className="opacity-80 flex items-center gap-1">
                            <span className="text-[0.75rem]">{duration} cupos</span>
                            <span className="w-1 aspect-square rounded-full bg-gray-500" />
                            <span className="text-[0.75rem]">{quota} horas</span>
                        </div>
                    </div>
                </div>
            </Link>
        </AnimateElement>
    );
}

function Skeleton() {
    return (
        <AnimateElement className="relative flex flex-col w-full h-full gap-3 p-3 rounded-xl bg-[var(--color6-bg)]">
            <div className="brigth-animation absolute inset-0 rounded-xl" />
            <div className="w-full aspect-video rounded-xl bg-[--color6-txt]" />
            <div className="flex w-full gap-2">
                <div className="w-12 pt-1">
                    <div className="w-full aspect-square rounded-full bg-[--color6-txt]" />
                </div>
                <div className="flex flex-col w-full h-auto  gap-2 ">
                    <div className="w-full h-5  rounded-full bg-[--color6-txt]" />
                    <div className="flex gap-2">
                        <div className="w-36 h-3 rounded-full bg-[--color6-txt]" />
                        <div className="w-3 aspect-square rounded-full bg-[--color6-txt]" />
                    </div>
                    <div className="w-36 h-2 rounded-full bg-[--color6-txt]" />
                </div>
            </div>
        </AnimateElement>
    );
}
