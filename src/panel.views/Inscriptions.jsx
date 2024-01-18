import { CrudTable, CrudTableTdText, CrudTableTdFlex } from "../panel.components/CrudTable";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import {
    faUserGraduate,
    faTrash,
    faCheck,
    faBan,
    faX,
    faFilePdf,
    faTimes,
    faEllipsisV,
    faRefresh,
    faFileCsv,
    faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import CrudHead from "../panel.components/CrudHead";
import Button from "../panel.components/Button";
import { useEffect, useRef, useState } from "react";
import {
    destroyInscription,
    getInscriptions,
    updateStateCertificateCode,
} from "../services/inscriptions";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import { showNotification } from "../panel.components/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../apiConfig";

export default function Inscriptions({ course }) {
    const courseId = course?.id;
    const {
        datalist,
        handleModeDelete,
        confirm,
        progress,
        handleDelete,
        hanleCancel,
        searchValue,
        searchOnChange,
        showProgress,
        updateDatalist,
    } = useCrudPanel({
        entityName: "Inscripcion",
        searchFields: ["student.name", "student.lastname", "student.dni", "student.email"],
        crudGet: getInscriptions,
        crudDestroy: destroyInscription,
    });

    const [isOpenCode, setIsOpenCode] = useState(false);
    const [myInscriptions, setMyInscriptions] = useState(null);
    const [selectedInscription, setSelectedInscription] = useState(null);

    useEffect(() => {
        if (datalist) {
            const filter = datalist.filter((item) => item.course_id == courseId);
            if (filter.length > 0) setMyInscriptions(filter);
            else setMyInscriptions([]);
        }
    }, [courseId, datalist]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCloseCode = () => {
        setIsOpenCode(false);
    };

    const handleOpenCode = (inscription) => {
        setIsOpenCode(true);
        setSelectedInscription(inscription);
    };

    const handleClick = (inscription, value, code = "") => {
        showProgress(true);
        const data = { state: value };
        if (code) data.certificate_code = code;
        return updateStateCertificateCode({ id: inscription.id, data }).then((res) => {
            showProgress(false);
            if (res?.success) {
                const index = datalist.findIndex((item) => item.id === res?.data?.id);
                const newItems = [...datalist];
                const newItem = newItems[index];
                newItem.state = res?.data?.state;
                newItem.certificate_code = res?.data?.certificate_code;
                newItems[index] = newItem;
                updateDatalist(newItems);

                showNotification({
                    title: "Exito",
                    message: `Estado de la inscripción actualizado correctamente`,
                    type: "success",
                });
            } else {
                showNotification({
                    title: "Error desde el servidor",
                    message: res.message || `Error al actualizar el estado de la inscripción`,
                    type: "danger",
                });
            }
        });
    };

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title={course?.name}
                icon={faUserGraduate}
                isOpen={true}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
                rightButtonComponent={
                    <OptionsButton>
                        <Button
                            href={API_URL + "get-insciptions-cetec-register-excel/" + course?.id}
                            target="_blank"
                            text="Registro"
                            icon={faFileExcel}
                            type="new"
                            tagType={2}
                            classNameIcon="text-base"
                        />
                        <Button
                            href={API_URL + "get-inscription-moodle-csv-export/" + course?.id}
                            target="_blank"
                            text="Moodle"
                            icon={faFileCsv}
                            type="delete"
                            tagType={2}
                            className="bg-yellow-500"
                            classNameIcon="text-base text-black"
                            classNameText="text-black"
                        />
                        <Button
                            href={API_URL + "get-insciptions-cetec-approveds-excel/" + course?.id}
                            target="_blank"
                            text="Códigos"
                            icon={faFileExcel}
                            type="edit"
                            tagType={2}
                            classNameIcon="text-base"
                        />
                    </OptionsButton>
                }
            />
            <CrudTable
                titles={["Nombres", "Cedula", "Estado"]}
                actionsNum={5}
                dataList={myInscriptions}
                isOpen={true}
                actionText="Opciones"
                onRowPrint={(item) => {
                    let classState = "";
                    if (item.state == "Inscrito") classState = "text-blue-500";
                    else if (item.state == "Aprobado") classState = "text-green-600";
                    else if (item.state == "Reprobado") classState = "text-red-500";
                    else classState = "text-gray-500";

                    return (
                        <tr key={item.id}>
                            <CrudTableTdText
                                value={item?.student?.name}
                                classNameText={item.state == "Baneado" ? "line-through" : ""}
                            />
                            <CrudTableTdText
                                value={item?.student?.dni}
                                classNameText={item.state == "Baneado" ? "line-through" : ""}
                            />
                            <CrudTableTdText value={item?.state} classNameText={classState} />
                            <CrudTableTdFlex>
                                <OptionsButton>
                                    <Button
                                        text="Certificado"
                                        icon={faFilePdf}
                                        type="new"
                                        tagType={2}
                                        className={
                                            "bg-white border border-solid border-green-700 opacity-90 hover:opacity-100 " +
                                            (item.state != "Aprobado" ? "hidden" : "")
                                        }
                                        classNameText="text-green-700"
                                        classNameIcon="text-lg text-green-700"
                                        href={item.certificate_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        disabled={item.state != "Aprobado"}
                                    />
                                    <Button
                                        text="Aprobar"
                                        icon={faCheck}
                                        type="new"
                                        onClick={() => handleOpenCode(item, "Aprobado")}
                                        className={item.state == "Aprobado" ? "hidden" : ""}
                                        disabled={item.state == "Aprobado"}
                                    />
                                    <Button
                                        text="Inscrito"
                                        icon={faRefresh}
                                        type="edit"
                                        onClick={() => handleClick(item, "Inscrito")}
                                        className={item.state == "Inscrito" ? "hidden" : ""}
                                        disabled={item.state == "Inscrito"}
                                    />
                                    <Button
                                        text="Reprobar"
                                        icon={faX}
                                        type="delete"
                                        onClick={() => handleClick(item, "Reprobado")}
                                        className={item.state == "Reprobado" ? "hidden" : ""}
                                        disabled={item.state == "Reprobado"}
                                    />
                                    <Button
                                        text="Banear"
                                        icon={faBan}
                                        type="cancel"
                                        onClick={() => handleClick(item, "Baneado")}
                                        className={
                                            "bg-gray-500 " +
                                            (item.state == "Baneado" ? "hidden" : "")
                                        }
                                        disabled={item.state == "Baneado"}
                                    />
                                    <Button
                                        text="Expulsar"
                                        icon={faTrash}
                                        type="cancel"
                                        onClick={() => handleModeDelete(item)}
                                        className="bg-red-500"
                                    />
                                </OptionsButton>
                            </CrudTableTdFlex>
                        </tr>
                    );
                }}
            />

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este usuario?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <ModalCertificate
                isOpen={isOpenCode}
                onClose={handleCloseCode}
                inscription={selectedInscription}
                onClickSubmit={(evt) =>
                    handleClick(selectedInscription, "Aprobado", evt.certificate_code.value).then(
                        () => handleCloseCode()
                    )
                }
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}

function ModalCertificate({ isOpen = true, onClose, onClickSubmit, inscription }) {
    const $form = useRef(null);
    if ($form.current) {
        $form.current.onsubmit = (e) => {
            e.preventDefault();
            onClickSubmit(e.target);
        };
        $form.current.certificate_code.value = inscription?.certificate_code;
        $form.current.certificate_code.focus();
    }

    return (
        <div
            className={
                "absolute inset-0 z-10 justify-center items-center bg-black/20 " +
                (!isOpen ? "hidden" : "flex")
            }
        >
            <form
                ref={$form}
                className="relative bg-white w-full max-w-96 h-44 rounded-lg shadow-lg p-3 flex flex-col gap-3 justify-center items-center border border-solid border-gray-300 duration-100"
            >
                <button
                    className="group absolute right-2 top-2 hover:bg-red-500 w-7 aspect-square rounded-md "
                    onClick={onClose}
                    type="button"
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="text-lg group-hover:text-white duration-0"
                    />
                </button>
                <h4 className="mb-2">Ingrese el código del certificado:</h4>
                <input
                    type="text"
                    className="w-full max-w-60 p-2 border border-solid border-gray-300 rounded-sm"
                    placeholder="Escribe el codigo.."
                    name="certificate_code"
                />
                <div className="flex gap-2 w-full max-w-60">
                    <Button
                        text="Aceptar"
                        icon={faCheck}
                        _type="submit"
                        type="new"
                        className="w-full"
                    />
                    <Button
                        text="Cancelar"
                        icon={faBan}
                        type="cancel"
                        className="w-full"
                        onClick={onClose}
                    />
                </div>
            </form>
        </div>
    );
}

function OptionsButton({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="relative w-10 aspect-square">
                <button
                    className="flex justify-center items-center w-full h-full rounded-full cursor-pointer opacity-60 hover:opacity-100 hover:bg-black/10"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={faEllipsisV} className="text-lg" />
                </button>
                <div
                    className={
                        "absolute right-[calc(100%+5px)] top-[50%] translate-y-[-50%] overflow-hidden flex h-auto gap-1 bg-white/40 rounded-lg shadow " +
                        (isOpen ? "max-w-[500px] p-2 opacity-100" : "max-w-0 p-0 opacity-0")
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
