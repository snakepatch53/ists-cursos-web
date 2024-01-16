import "./certificados.css";
import AnimateElement from "../components/AnimateElement";
import CertificadoItem from "../landing.components/CertificadoItem";
import { useEffect, useRef, useState } from "react";
import { isCedula } from "../utils/validations";
import { showCertificates } from "../services/inscriptions";

export default function Certificados() {
    const [search, setSearch] = useState("");
    const [inscriptions, setInscriptions] = useState([]);
    const [state, setState] = useState(0);
    const $input = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isCedula(search)) {
            const data = { username: search };
            setState(1);
            showCertificates({ data }).then((res) => {
                if (res.success) {
                    const _data = res.data.sort((a, b) => {
                        if (a.state == "Aprobado") return -1;
                        if (b.state == "Aprobado") return 1;
                        if (a.state == "Inscrito") return -1;
                        if (b.state == "Inscrito") return 1;
                    });
                    setInscriptions(_data);
                    setState(2);
                } else {
                    setInscriptions([]);
                    setState(0);
                }
                setTimeout(() => {
                    $input.current.focus();
                }, 100);
            });
        } else {
            setState(0);
        }
    }, [search]);

    return (
        <AnimateElement className="cert-page">
            <section className="bg-menu"></section>
            <section className="search">
                <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={state == 1}
                    className={state == 1 ? "disabled" : ""}
                    searchRef={$input}
                />
                <div className="resultado">
                    <div
                        className={
                            " p-2 h-full w-full bg-[var(--color1-bg)] text-[var(--color1-txt)] rounded-md " +
                            (state === 2 ? "flex" : "hidden")
                        }
                    >
                        {inscriptions && inscriptions.length === 0 && (
                            <h3>No se encontraron resultados</h3>
                        )}
                        {inscriptions && inscriptions.length > 0 && (
                            <h3>{inscriptions.length} Resultado(s) de Curso</h3>
                        )}
                    </div>
                    <div className="items">
                        {state == 1 && (
                            <h2 className="flex min-h-5 justify-center items-center text-center font-content font-bold text-base text-[var(--color1-bg)]">
                                Cargando..
                            </h2>
                        )}
                        {state == 2 &&
                            inscriptions.length > 0 &&
                            inscriptions.map((item, index) => (
                                <CertificadoItem key={item.id} number={index + 1} {...item} />
                            ))}
                    </div>
                </div>
            </section>
        </AnimateElement>
    );
}

function Search({ value, onChange, className = "", disabled = false, searchRef }) {
    return (
        <div className="container">
            <div className="titulo">
                <h2>CONSULTA DE CERTIFICADOS</h2>
            </div>
            <div className="instituciones">
                <div className="institucion">
                    <div className="text">
                        <h3>EDUCACION CONTINUA</h3>
                        <span>IST SUCUA</span>
                    </div>
                    <div className="line"></div>
                    <img src="./img/icon.png" />
                </div>
                <div className="line"></div>
                <div className="institucion">
                    <img src="./img/senecyt.png" />
                    <div className="line"></div>
                    <div className="text">
                        <h3>EDUCACION SUPERIOR</h3>
                        <span>SENECYT</span>
                    </div>
                </div>
            </div>
            <div className="buscador">
                <input
                    type="search"
                    placeholder="Escribe tu cédula.."
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={" " + className}
                    ref={searchRef}
                />
            </div>
        </div>
    );
}
