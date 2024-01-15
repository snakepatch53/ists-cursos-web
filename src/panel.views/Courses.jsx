import CrudHead from "../panel.components/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdImage,
    CrudTableTdText,
} from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import {
    faPen,
    faTrash,
    faVideo,
    faUserGraduate,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import { destroyCourse, getCourses, storageCourse, updateCourse } from "../services/courses";
import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import { getTemplates } from "../services/templates";
import Inscriptions from "./Inscriptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Courses() {
    const extraValidations = ($form, showNotification, { isUrl }) => {
        if (!isUrl($form.whatsapp.value)) {
            showNotification("El link debe ser una URL valida");
            return false;
        }
        return true;
    };

    const {
        head,
        table,
        form,
        confirm,
        progress,
        datalist,
        $form,
        handleModeNew,
        handleModeEdit,
        handleModeDelete,
        hanleCancel,
        handleSubmit,
        handleDelete,
        searchValue,
        searchOnChange,
    } = useCrudPanel({
        entityName: "Curso",
        searchFields: ["name", "teacher.name", "teacher.lastname"],
        extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        excludeFieldsValidationEdit: ["image"],
        crudGet: getCourses,
        crudStorage: storageCourse,
        crudUpdate: updateCourse,
        crudDestroy: destroyCourse,
    });

    const [isOpenInscriptions, setIsOpenInscriptions] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [responsibles, setResponsibles] = useState([]);
    useEffect(() => {
        getUsers().then((res) => setUsers(res));
        getTemplates().then((res) => setTemplates(res));
    }, []);

    useEffect(() => {
        // setTeachers(
        //     users.filter((user) => user.role === "Profesor" || user.role === "Administrador")
        // );
        setTeachers(users);
        // setResponsibles(
        //     users.filter((user) => user.role === "Responsable" || user.role === "Administrador")
        // );
        setResponsibles(users.filter((user) => user.role !== "Profesor"));
    }, [users]);

    return (
        <>
            <AnimateElement className="flex flex-col gap-7 w-full">
                <CrudHead
                    title="Cursos"
                    icon={faVideo}
                    isOpen={head}
                    onClickNew={handleModeNew}
                    searchValue={searchValue}
                    searchOnChange={searchOnChange}
                />

                <CrudTable
                    titles={["Imagen", "Nombre", "Cupos", "Duración", "Fecha de Inicio"]}
                    dataList={datalist}
                    isOpen={table}
                    actionsNum={3}
                    onRowPrint={(item) => (
                        <tr key={item.id}>
                            <CrudTableTdImage src={item.image_url} alt={"Logo de " + item.name} />

                            <CrudTableTdText value={item.name} />
                            <CrudTableTdText value={item.quota} />
                            <CrudTableTdText value={item.duration} />
                            <CrudTableTdText value={item.date_start_str} />

                            <CrudTableTdFlex>
                                <Button
                                    text="Alumnos"
                                    icon={faUserGraduate}
                                    type="cancel"
                                    onClick={() => {
                                        setSelectedCourse(item);
                                        setIsOpenInscriptions(true);
                                    }}
                                />
                                <Button
                                    text="Editar"
                                    icon={faPen}
                                    type="edit"
                                    onClick={() => handleModeEdit(item)}
                                />
                                <Button
                                    text="Borrar"
                                    icon={faTrash}
                                    type="delete"
                                    onClick={() => handleModeDelete(item)}
                                />
                            </CrudTableTdFlex>
                        </tr>
                    )}
                />

                <CrudForm
                    title="Curso"
                    isOpen={form}
                    onClickCancel={hanleCancel}
                    onSubmit={handleSubmit}
                    formRef={$form}
                >
                    <CrudFormInput
                        label="Nombre"
                        placeholder="Escriba el nombre del curso"
                        name="name"
                        required
                    />
                    <CrudFormInput
                        label="Grupo de Whatsapp"
                        placeholder="Escriba el enlace"
                        name="whatsapp"
                        required
                    />
                    <CrudFormInput
                        label="Duración"
                        placeholder="Tiempo de duracion del curso "
                        name="duration"
                        type="number"
                        required
                    />
                    <CrudFormInput
                        label="Cupos"
                        placeholder="Cupos del curso"
                        name="quota"
                        type="number"
                        required
                    />
                    <CrudFormInput label="Fecha de Inicio" name="date_start" type="date" required />
                    <CrudFormInput label="Fecha de Fin" name="date_end" type="date" required />

                    <CrudFormInput
                        label="Descripcion "
                        placeholder="Escriba una descripcion del curso"
                        name="description"
                        required
                    />

                    <CrudFormInput
                        name="published"
                        label="Publicar"
                        type="radio"
                        radioOptions={[
                            { value: "1", label: "Si" },
                            { value: "0", label: "No", checked: true },
                        ]}
                        required
                    />
                    <CrudFormInput name="teacher_id" label="Profesor" type="select" required>
                        <option value="">Seleccione..</option>
                        {teachers.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </CrudFormInput>
                    <CrudFormInput name="responsible_id" label="Responsable" type="select" required>
                        <option value="">Seleccione..</option>
                        {responsibles.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </CrudFormInput>
                    <CrudFormInput
                        name="template_id"
                        label="Plantilla de Certificado"
                        placeholder="Seleccione la plantilla PDF"
                        type="select"
                        required
                    >
                        <option value="">Seleccione..</option>
                        {templates.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </CrudFormInput>
                    <CrudFormInput
                        label="Image"
                        type="file"
                        name="image"
                        accept="image/jpg"
                        required
                    />
                </CrudForm>

                <CrudConfirm
                    isOpen={confirm}
                    text="¿Seguro de eliminar este curso?"
                    onClickDelete={handleDelete}
                    onClickCancel={hanleCancel}
                />

                <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />

                <PopupInscriptions
                    isOpen={isOpenInscriptions}
                    onClickClose={() => setIsOpenInscriptions(false)}
                    course={selectedCourse}
                />
            </AnimateElement>
        </>
    );
}

function PopupInscriptions({ isOpen = false, onClickClose, course }) {
    window.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") onClickClose();
    });
    return (
        <AnimateElement
            className={
                "absolute z-50 inset-0 bg-black/50 flex justify-center items-center p-[var(--padding)] " +
                (isOpen ? "" : "hidden")
            }
            onClick={(evt) => {
                if (evt.target === evt.currentTarget) onClickClose();
            }}
        >
            <div className="relative bg-white p-[var(--padding)] w-full max-w-[var(--max-width)] rounded-lg shadow-xl">
                <button
                    className="group absolute right-2 top-2 w-8 aspect-square bg-transparent hover:bg-[#e53d30] text-xl cursor-pointer rounded-md duration-100"
                    onClick={onClickClose}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="text-gray-500 group-hover:text-white duration-0"
                    />
                </button>
                <Inscriptions course={course} />
            </div>
        </AnimateElement>
    );
}
