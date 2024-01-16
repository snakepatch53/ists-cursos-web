import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    icon,
    text,
    type = 1,
    _type = "button",
    className = "",
    ...props
}) {
    let classNameStyles = type == 1 ? "primary" : "";
    classNameStyles = type == 2 ? "secondary" : classNameStyles;
    classNameStyles = type == 3 ? "tertiary" : classNameStyles;
    return (
        <button
            className={"button-component button-type-" + classNameStyles + " " + className}
            type={_type}
            {...props}
        >
            <span>{text}</span>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
