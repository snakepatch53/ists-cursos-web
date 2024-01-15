export default function Title({ text, className = "", ...props }) {
    return (
        <div className={"relative flex w-full justify-center pb-2 " + className} {...props}>
            <h1 className="font-title2 text-[--color3-txt] text-3xl">{text}</h1>
            <div className="absolute bottom-0 h-1 w-28 bg-[var(--color1-bg)]" />
        </div>
    );
}
