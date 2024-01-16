import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SectionTitle({ icon, title, description, className = "", dark = false }) {
    return (
        <div
            className={
                (dark ? "bg-[var(--color4-bg)]" : "bg-[var(--color3-bg)]") + " w-full " + className
            }
        >
            <div className="w-full px-[var(--padding)]">
                <div
                    className={
                        "container flex flex-col items-center w-full gap-3 " +
                        (dark ? "text-[var(--color4-txt)]" : "text-[var(--color1-bg)]")
                    }
                >
                    <FontAwesomeIcon icon={icon} className="text-[4rem]" />
                    <h2 className="text-3xl font-title2 uppercase">{title}</h2>
                    <p
                        className={
                            "font-content2 text-balance opacity-80 text-center " +
                            (!dark ? "text-[var(--color3-txt)]" : "")
                        }
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
