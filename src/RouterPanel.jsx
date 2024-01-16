import "./RouterPanel.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./panel.components/Header";
import Sidebar from "./panel.components/Sidebar";
import { useState } from "react";
import Home from "./panel.views/Home";
import Users from "./panel.views/Users";
import Slider from "./panel.views/Slider";
import Students from "./panel.views/Students";
import Courses from "./panel.views/Courses";
import Redes from "./panel.views/Redes";
import Templates from "./panel.views/Templates";
import Instituciones from "./panel.views/Instituciones";
import NotFoundComponent from "./components/NotFoundComponent";
import { logout } from "./services/users";
import { Notification } from "./panel.components/Notification";
import Mailbox from "./panel.views/Mailbox";
import CrudProgress from "./panel.components/CrudProgress";
export default function RouterPanel({ session, updateSession }) {
    const [showSidebar, setShowSidebar] = useState("open");
    const [progress, setProgress] = useState(false);
    const handleClickShowSidebar = () => {
        setShowSidebar(showSidebar == "open" ? "close" : "open");
    };

    function handleLogout() {
        setProgress(true);
        logout().then(() => {
            window.localStorage.removeItem("session");
            window.location.href = "/";
        });
    }

    return (
        <Router>
            <div className="panel-page">
                <Notification />
                <div className={"panel-page-state " + showSidebar}></div>
                <Header onClickButtonBars={handleClickShowSidebar} onLogout={handleLogout} />

                <div className="panel-page-content">
                    <Sidebar session={session} />
                    <div className="panel-page-page scroll-style relative">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home session={session} updateSession={updateSession} />}
                            />
                            <Route
                                path="/login"
                                element={<Home session={session} updateSession={updateSession} />}
                            />
                            <Route path="/users" element={<Users session={session} />} />
                            <Route path="/slider" element={<Slider session={session} />} />
                            <Route path="/students" element={<Students session={session} />} />
                            <Route path="/templates" element={<Templates session={session} />} />
                            <Route path="/courses" element={<Courses session={session} />} />
                            <Route path="/redes" element={<Redes session={session} />} />
                            <Route path="/mailbox" element={<Mailbox session={session} />} />
                            <Route
                                path="/instituciones"
                                element={<Instituciones session={session} />}
                            />
                            <Route
                                path="*"
                                element={
                                    <div className="flex justify-center max-w-[600px]">
                                        <NotFoundComponent />
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
            <CrudProgress isOpen={progress} text="Cerrando sesion..." />
        </Router>
    );
}
