import "./CertificadoItem.css";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CertificadoItem({
    nombre,
    participante,
    cedula,
    estado,
    horas,
    fecha_inicio,
    fecha_fin,
    codigo,
    pdf_url,
    number,
}) {
    if (
        nombre &&
        participante &&
        cedula &&
        estado &&
        horas &&
        fecha_inicio &&
        fecha_fin &&
        codigo &&
        pdf_url
    )
        return (
            <div className="item">
                <div className="numero">
                    <span>{number}</span>
                </div>
                <div className="info">
                    <table>
                        <thead>
                            <tr>
                                <th>NOMBRE DEL CURSO:</th>
                                <td>{nombre}</td>
                            </tr>
                            <tr>
                                <th>NOMBRE DEL CURSANTE:</th>
                                <td>{participante}</td>
                            </tr>
                            <tr>
                                <th>CECULA:</th>
                                <td>{cedula}</td>
                            </tr>
                            <tr>
                                <th>ESTADO:</th>
                                <td>{estado}</td>
                            </tr>
                            <tr>
                                <th>HORAS:</th>
                                <td>{horas}</td>
                            </tr>
                            <tr>
                                <th>FECHA:</th>
                                <td>
                                    Desde {fecha_inicio} Hasta {fecha_fin}
                                </td>
                            </tr>
                            <tr>
                                <th>CODIGO:</th>
                                <td>{codigo}</td>
                            </tr>
                            <tr>
                                <th>PDF:</th>
                                <td>
                                    <a href={pdf_url} target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faFilePdf} />
                                    </a>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    return (
        <div className=" flex flex-col h-full w-full relative overflow-hidden rounded-3xl p-5 cursor-pointer">
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
