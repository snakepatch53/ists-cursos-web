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
        </footer>
    );
}
