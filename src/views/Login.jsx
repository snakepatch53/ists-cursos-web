import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateElement from "../components/AnimateElement";
import "./Login.css";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { login } from "../services/users";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function loguear(evt) {
        evt.preventDefault();
        const data = {
            username,
            password,
        };
        login({ data }).then((response) => {
            if (response) {
                window.localStorage.setItem("session", JSON.stringify(response));
                window.location.href = "/";
            }
        });
    }
    return (
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
    );
}
