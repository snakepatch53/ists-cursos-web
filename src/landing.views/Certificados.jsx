import "./certificados.css";
import AnimateElement from "../components/AnimateElement";
import certificados from "./../mooks/certficados.json";
import CertificadoItem from "../landing.components/CertificadoItem";
import { useEffect, useState } from "react";
import { isCedula, isEmail } from "../utils/validations";
// import { useEffect, useState } from "react";
// import { getCertificates } from "../services/certificates";

export default function Certificados() {
    const [search, setSearch] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isCedula(search) || isEmail(search)) {
            return false;
        }
    }, [search]);

    return (
        <AnimateElement className="cert-page">
            <section className="bg-menu"></section>
            <section className="search">
                <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="resultado">
                    <div className="n-result">
                        <h3>1 Resultado(s) de Curso</h3>
                    </div>
                    <div className="items">
                        <CertificadoItem />
                        {certificados.map((certificado, index) => (
                            <CertificadoItem
                                key={certificado.id}
                                number={index + 1}
                                {...certificado}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </AnimateElement>
    );
}

function Search({ value, onChange }) {
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
                    placeholder="Escribe tu cédula o email.."
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
