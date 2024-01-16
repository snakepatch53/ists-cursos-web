import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateElement from "../components/AnimateElement";
import "./Login.css";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { login } from "../services/users";
import CrudProgress from "../panel.components/CrudProgress";
import { Notification, showNotification } from "../panel.components/Notification";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [progress, setProgress] = useState(false);

    function loguear(evt) {
        evt.preventDefault();
        const data = {
            username,
            password,
        };
        setProgress(true);
        login({ data }).then((response) => {
            setProgress(false);
            if (response.success) {
                window.localStorage.setItem("session", JSON.stringify(response.data));
                window.location.href = "/";
                return;
            }
            showNotification({
                title: "Error desde el servidor",
                message: response.message || "Error en el servidor",
                type: "danger",
            });
        });
    }
    return (
        <>
            <Notification />
            <AnimateElement className="login-page">
                <form action="#" onSubmit={loguear} id="element_form">
                    <div className="container">
                        <img className="logo" src="./img/logo.png" alt="Logo" />
                        <span>Cursos ISTS</span>
                        <div className="input">
                            <FontAwesomeIcon icon={faUser} />
                            <input
                                placeholder="Usuario"
                                type="text"
                                name="username"
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} />
                            <input
                                placeholder="Contraseña"
                                type="password"
                                name="password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                        <div className="input msg">
                            <span className="msg"></span>
                        </div>
                        {/* <div className="input submit" onClick={onLogin}> */}
                        <div className="input submit">
                            <input type="submit" value="Iniciar sesion" />
                        </div>
                    </div>
                </form>

                <section className="ideamodal _open" id="sectionProgress">
                    <div className="modal-progress">
                        <span id="sectionProgressText">Procesando..</span>
                        <div className="progress_bar"></div>
                    </div>
                </section>
            </AnimateElement>
            <CrudProgress isOpen={progress} text="Comprobando credenciales..." />
        </>
    );
}
