import "./SocialNetworkLink.css";

export default function SocialNetworkLink({
    id,
    name,
    url,
    icon,
    color,
    color2 = "",
    style = 1,
    ...props
}) {
    const className = props.className ?? "";
    if (style == 1)
        return (
            <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={"social-network-link-component " + className}
                {...props}
            >
                <div
                    className="container-icon"
                    dangerouslySetInnerHTML={{
                        __html: icon,
                    }}
                    style={{ fill: color }}
                />
            </a>
        );
    else if (style == 2)
        return (
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group relative w-[60px] h-[60px] rounded-[60px] cursor-pointer flex justify-center items-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-[0.5s] hover:w-[180px] hover:shadow-[0_10px_25px_rgba(0,0,0,0)]"
            >
                <div
                    className="absolute inset-0 rounded-[50px] opacity-0 transition-all duration-[0.5s] group-hover:opacity-100"
                    style={{
                        background: `linear-gradient(45deg, ${color}, ${color2})`,
                    }}
                />
                <div
                    className="absolute top-[10px] w-full h-full rounded-[60px] opacity-0 transition-all duration-[0.5s] -z-1 blur-[15px] group-hover:opacity-[0.5]"
                    style={{
                        background: `linear-gradient(45deg, ${color}, ${color2})`,
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{ __html: icon }}
                    className={`icon fill-[#777] w-7 aspect-square delay-[0.25s] transition-all group-hover:scale-[0] group-hover:w-10`}
                ></div>
                <span className="absolute text-white text-[1.1rem] uppercase tracking-[-1px] sm:tracking-[0.1rem] scale-0 transition-all duration-[0.5s] delay-[0s] group-hover:scale-[1] group-hover:delay-[0.25s]">
                    {name}
                </span>
            </a>
        );
}
