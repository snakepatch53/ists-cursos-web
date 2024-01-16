import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CertificadoItem({ number, load = false, ...props }) {
    let classNameState = "";
    if (props.state == "Inscrito") classNameState = "text-blue-600";
    if (props.state == "Aprobado") classNameState = "text-green-600";
    if (props.state == "Reprobado") classNameState = "text-red-600";
    // texto tachado con tailwind
    if (props.state == "Baneado") classNameState = "text-gray-600 line-through";

    if (!load)
        return (
            <div className="flex flex-col justify-center items-center w-full h-full rounded-lg overflow-hidden border border-solid border-black/10">
                <div className="w-full p-2 bg-[var(--color1-bg)] text-[var(--color1-txt)]">
                    <span className="flex justify-center items-center w-5 aspect-square rounded-full bg-[var(--color1-txt)] text-[var(--color1-bg)] text-sm font-content font-bold">
                        {number}
                    </span>
                </div>
                <div className="w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <Row name="NOMBRE DEL CURSO:" value={props.course.name} />
                            <Row name="NOMBRE DEL CURSANTE:" value={props.student.name} isDark />
                            <Row name="CECULA:" value={props.student.dni} />
                            <Row
                                name="ESTADO:"
                                value={props.state}
                                classNameTd={classNameState}
                                isDark
                            />
                            <Row name="HORAS:" value={props.course.duration} />
                            <Row name="DESDE:" value={props.course.date_start_str} isDark />
                            <Row name="HASTA:" value={props.course.date_end_str} />
                            {props.state == "Aprobado" && (
                                <>
                                    <Row name="CODIGO:" value={props.certificate_code} isDark />
                                    <Row
                                        name="PDF:"
                                        value={
                                            <a
                                                href={props.certificate_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFilePdf}
                                                    className="text-red-600 text-2xl"
                                                />
                                            </a>
                                        }
                                    />
                                </>
                            )}
                        </thead>
                    </table>
                </div>
            </div>
        );
    return (
        <div className=" flex flex-col h-full w-full relative overflow-hidden rounded-lg p-5 cursor-pointer">
            <div className="brigth-animation absolute inset-0" />
            <div className=" h-8 w-full bg-[var(--color6-txt)] rounded-full mb-5" />
            <div className="grid grid-cols-2 gap-5 w-full h-full">
                <div className="flex-1 ml-auto w-6/12 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 w-6/12 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 ml-auto w-4/6 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 w-4/6 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 ml-auto w-3/4 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 w-3/4 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 ml-auto w-4/5 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 w-4/5 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
                <div className="flex-1 h-10 bg-[var(--color6-txt)] rounded-full" />
            </div>
        </div>
    );
}

function Row({ name, value, isDark = false, classNameTd = "" }) {
    const classNameCol =
        "w-1/2 border border-solid border-black/20 m-0 py-2 px-3 " +
        (isDark ? "bg-black/10" : "bg-black/0");
    return (
        <tr>
            <th className={"text-end " + classNameCol}>{name}</th>
            <td className={" " + classNameCol + " " + classNameTd}>{value}</td>
        </tr>
    );
}
