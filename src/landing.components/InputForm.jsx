import "./InputForm.css";

export default function InputForm({
    name,
    labelText,
    placeholder = "",
    radioOptions = [],
    type = "text",
}) {
    if (type != "radio")
        return (
            <div className="input-form-component">
                <label htmlFor={name}>{labelText}</label>
                {type !== "textarea" ? (
                    <input type={type} placeholder={placeholder} name={name} id={name} />
                ) : (
                    <textarea name={name} id={name} placeholder={placeholder}></textarea>
                )}
            </div>
        );
    else if (type == "radio")
        return (
            <div className="w-full flex gap-4 items-center justify-center">
                <div className="flex flex-col gap-1 h-full w-full">
                    <h3 className="text-[1.1rem] pl-1">{labelText}</h3>
                    <div
                        className="flex w-full rounded-md overflow-hidden"
                        style={{ border: "solid 1px rgba(0, 0, 0, 0.2)" }}
                    >
                        {radioOptions.map(({ value, label }) => (
                            <div className="relative flex-1" key={value}>
                                <input
                                    type="radio"
                                    id={name + "-" + value}
                                    name={name}
                                    value={value}
                                    className="hidden [&:checked~div]:w-full [&:checked~label]:opacity-100"
                                />
                                <div className="absolute bottom-0 left-0 right-0 m-auto w-0 h-0.5 bg-[var(--info)] transition-all duration-200" />
                                <label
                                    htmlFor={name + "-" + value}
                                    className="cursor-pointer flex w-full h-full justify-center text-center p-2 transition-all duration-200 opacity-80 hover:opacity-100"
                                >
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}
