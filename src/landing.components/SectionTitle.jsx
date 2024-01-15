import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SectionTitle.css";

export default function SectionTitle({ icon, title, description }) {
    return (
        <div className="nosotros-item">
            <FontAwesomeIcon icon={icon} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
