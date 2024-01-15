import "./NotFound.css";
import AnimateElement from "../components/AnimateElement";
import NotFoundComponent from "../components/NotFoundComponent";

export default function NotFound() {
    return (
        <AnimateElement className="notfound-page">
            <section className="bg-menu"></section>

            <NotFoundComponent />
        </AnimateElement>
    );
}
