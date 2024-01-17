import "./Sidebar.css";

import {
    faCode,
    faHome,
    faImage,
    faInstitution,
    faLink,
    faMessage,
    faUserGraduate,
    faUsers,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Sidebar({ session }) {
    return (
        <div className="panel-sidebar-component">
            <img
                src={session.photo_url}
                alt={"Foto del usuario " + session.name}
                className="user_img"
            />
            <span className="text-[var(--color4-txt)]">{session.name}</span>
            <span className="user_name">{session.role}</span>

            <Link className="option" to="/">
                <FontAwesomeIcon icon={faHome} />
                <span>Inicio</span>
            </Link>

            <hr />

            {session.role == "Administrador" && (
                <Link className="option" to="/users">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Usuarios</span>
                </Link>
            )}

            {session.role == "Administrador" && (
                <Link className="option" to="/slider">
                    <FontAwesomeIcon icon={faImage} />
                    <span>Slider</span>
                </Link>
            )}

            {session.role == "Administrador" && (
                <Link className="option" to="/students">
                    <FontAwesomeIcon icon={faUserGraduate} />
                    <span>Estudiantes</span>
                </Link>
            )}

            {session.role == "Administrador" && (
                <Link className="option" to="/templates">
                    <FontAwesomeIcon icon={faCode} />
                    <span>Templates</span>
                </Link>
            )}

            {session.role == "Administrador" && (
                <Link className="option" to="/redes">
                    <FontAwesomeIcon icon={faLink} />
                    <span>Redes</span>
                </Link>
            )}

            {session.role == "Administrador" && (
                <Link className="option" to="/instituciones">
                    <FontAwesomeIcon icon={faInstitution} />
                    <span>Instituciones</span>
                </Link>
            )}

            {(session.role == "Administrador" || session.role == "Responsable") && (
                <Link className="option" to="/mailbox">
                    <FontAwesomeIcon icon={faMessage} />
                    <span>Mensajes</span>
                </Link>
            )}

            <Link className="option" to="/courses">
                <FontAwesomeIcon icon={faVideo} />
                <span>Cursos</span>
            </Link>
        </div>
    );
}
