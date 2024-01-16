import { Link } from "react-router-dom";
import "./Footer.css";
import MenuItem from "./MenuItem";
import SocialNetworkLink from "./SocialNetworkLink";
import { useEffect, useState } from "react";
import { getInstitutions } from "../services/institutions";

// import instituciones from "./../mooks/instituciones.json";

// import redes from "./../mooks/redes-sociales.json";

export default function Footer({ socials = [] }) {
    const [instituciones, setinstituciones] = useState([]);

    useEffect(() => {
        getInstitutions().then((res) => setinstituciones(res));
    }, []);
    return (
        <footer>
            <svg className="fill-[var(--color4-bg)]" viewBox="0 0 1440 250">
                <path d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,106.7C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
            <div className="w-full bg-[var(--color4-bg)]">
                <div className="container">
                    <div className="elements">
                        <div className="element">
                            <Link to="/" className="logo">
                                <img src="/img/logo.png" />
                            </Link>
                        </div>
                        <div className="element">
                            <div className="redes">
                                <h3>Redes</h3>
                                <div className="items">
                                    {socials.map((red) => (
                                        <SocialNetworkLink key={red.id} {...red} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="element instituciones">
                            <h3>Instituciones</h3>
                            <ul>
                                {instituciones.map(({ id, name, url }) => (
                                    <li key={id}>
                                        <a href={url} target="_blank" rel="noreferrer">
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="element">
                            <h3>Enlaces</h3>
                            <ul>
                                <MenuItem to="/" name="Inicio" />
                                <MenuItem to="/cursos" name="Cursos" />
                                <MenuItem to="/nosotros" name="Nosotros" />
                                <MenuItem to="/contactos" name="Contactos" />
                                <MenuItem to="/certificados" name="Certificados" />
                                <MenuItem to="/login" name="Login" a_default />
                            </ul>
                        </div>
                    </div>
                    <div className="otros">
                        <p>© {new Date().getFullYear()} Ideasoft. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
