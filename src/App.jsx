import { useEffect, useState } from "react";
import RouterLanding from "./RouterLanding";
import RouterPanel from "./RouterPanel";
import Login from "./views/Login";
import Loading from "./components/Loading";

export default function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const _session = window.localStorage.getItem("session");
        if (_session) setSession(JSON.parse(_session));
        else setSession(false);
    }, []);

    const updateSession = (user) => {
        window.localStorage.setItem("session", JSON.stringify(user));
        setSession(user);
    };

    if (session == null) return <Loading />;
    if (window.location.pathname == "/login" && session == false) return <Login />;
    if (session) return <RouterPanel session={session} updateSession={updateSession} />;
    return <RouterLanding />;
}
