import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ children, to, name, a_default }) {
    const { pathname } = useLocation();
    const isLocation = (optionLocation) => {
        if (pathname == optionLocation) return "active";
        return "";
    };
    if (!a_default) {
        return (
            <li className={isLocation(to)}>
                <Link to={to}>{name}</Link>
                {children ? <ul className="sub_menu">{children}</ul> : ""}
            </li>
        );
    }
    return (
        <li className={isLocation(to)}>
            <a href={to}>{name}</a>
            {children ? <ul className="sub_menu">{children}</ul> : ""}
        </li>
    );
}
