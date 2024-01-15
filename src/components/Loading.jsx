import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
    return (
        <>
            <div className="h-[var(--header-height)] bg-[var(--color1-bg)]" />
            <div className="px-5 h-52 my-52">
                <div className="container flex justify-center items-center h-full">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>
            </div>
        </>
    );
}
