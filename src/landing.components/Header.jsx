import { useState } from "react";
import "./Header.css";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [showMenu, setShowMenu] = useState("");
    const handleShowMenu = () => {
        setShowMenu(showMenu == "" ? "open" : "");
    };

    const [color, setColor] = useState("color-trans");
    window.onscroll = () => {
        setColor(window.scrollY > 0 ? "color-red" : "color-trans");
    };
    return (
        <header className={color + " " + showMenu}>
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/img/logo.png" alt="Logo del ISTS" className="p-0.5" />
                </Link>
                <ul className="menu">
                    <MenuItem to="/" name="Inicio" />
                    <MenuItem to="/cursos" name="Cursos">
                        <MenuItem to="/cursos#section-proximos" name="Próximos" a_default />
                        <MenuItem to="/cursos#section-concluidos" name="Concluidos" a_default />
                        <MenuItem to="/cursos#section-en-progreso" name="En progreso" a_default />
                    </MenuItem>

                    <MenuItem to="/nosotros" name="Nosotros"></MenuItem>

                    <MenuItem to="/contactos" name="Contactos" />

                    <MenuItem to="/certificados" name="Certificados" />
                </ul>
                <button className="btn-burguer" onClick={handleShowMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </header>
    );
}
