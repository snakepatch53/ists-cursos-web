import AnimateElement from "../components/AnimateElement";

export default function EquipoItem({
    name,
    lastname,
    role,
    description,
    photo_url,
    facebook,
    load = false,
}) {
    if (!load)
        return (
            <AnimateElement>
                <a
                    href={facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col justify-start items-center h-full gap-4 p-4 text-[var(--color3-txt)] transition duration-300"
                >
                    <img
                        src={photo_url}
                        alt={"Foto del docente " + name}
                        className="w-full max-w-[300px] aspect-square object-cover rounded-full p-7 transition-all duration-300 group-hover:-translate-y-1 "
                    />
                    <h3 className="opacity-70 font-content2 text-md leading-3">
                        {name} {lastname}
                    </h3>
                    <span className="text-[var(--color1-bg)] font-content2 group-hover:underline">
                        {role}
                    </span>
                    <p className="opacity-90 font-content text-base">{description}</p>
                </a>
            </AnimateElement>
        );
    if (load)
        return (
            <AnimateElement className="relative items-center justify-center flex flex-col w-full h-full overflow-hidden cursor-pointer pt-8 pb-8 gap-1">
                <div className="brigth-animation absolute inset-0 rounded-3xl" />
                <div className="flex items-center justify-center w-full">
                    <div className="flex  w-full max-w-52 aspect-square rounded-full bg-[var(--color6-txt)] " />
                </div>
                <div className="flex flex-col justify-center items-center gap-1 pb-4">
                    <div className=" h-5 w-28 rounded-full bg-[var(--color6-txt)] shadow mt-4" />
                    <div className=" h-5 w-20 rounded-full bg-[var(--color6-txt)] shadow" />
                </div>
                <div className="flex-1 flex flex-col w-full gap-1 px-4 ">
                    <div className="h-4 w-full rounded-full bg-[var(--color6-txt)] shadow" />
                    <div className="h-4 w-full rounded-full bg-[var(--color6-txt)] shadow" />
                </div>
            </AnimateElement>
        );
}
