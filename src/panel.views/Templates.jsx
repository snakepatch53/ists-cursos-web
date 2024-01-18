import CrudHead from "../panel.components/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faCode, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import {
    destroyTemplate,
    getTemplates,
    storageTemplate,
    updateTemplate,
} from "../services/templates";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function Templates() {
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
        entityName: "Plantilla",
        searchFields: ["name"],
        gender: false,
        crudGet: getTemplates,
        crudStorage: storageTemplate,
        crudUpdate: updateTemplate,
        crudDestroy: destroyTemplate,
    });

    const [code, setCode] = useState("");

    const handleModeEditTemplate = (item) => {
        handleModeEdit(item);
        setCode(item.code);
    };

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Plantillas"
                icon={faCode}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Nombre"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.name} />

                        <CrudTableTdFlex>
                            <Button
                                text="Editar"
                                icon={faPen}
                                type="edit"
                                onClick={() => handleModeEditTemplate(item)}
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
                title="Plantilla"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
            >
                <CrudFormInput
                    label="Nombre"
                    placeholder="Escriba el nombre de la plantilla"
                    name="name"
                    classNameWrapper="col-span-2"
                    required
                />
                <div className="campo col-span-2">
                    <span>
                        Codigo <b>*</b>:
                    </span>
                    <Variables />

                    <div
                        className="rounded-md overflow-hidden"
                        style={{
                            border: "1px solid #d1d5db",
                        }}
                    >
                        <Editor
                            theme="vs-dark"
                            width="100%"
                            height="400px"
                            defaultLanguage="html"
                            value={code}
                            onChange={(value) => setCode(value)}
                        />
                        <input type="text" name="code" value={code} hidden />
                    </div>
                </div>
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar esta plantilla?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}

function Variables({ color = "text-blue-500" }) {
    return (
        <div className="py-0">
            <b className="font-content2 text-sm">Variables de Inscripción: </b>
            <p className="leading-4 mb-2">
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">state</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">certificate_code</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">logo</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">logo1</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">logo2</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">logo3</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">fondo_certificado1</label>
                    <b className={color}>{`}}`}</b>
                </span>
            </p>
            <b className="font-content2 text-sm">Variables de Estudiante: </b>
            <p className="leading-4 mb-2 px-7">
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.dni</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.name</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.lastname</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.sex</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.instruction</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.address</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.email</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.cellphone</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.phone</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.description</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.entity_name</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.entity_post</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.entity_address</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">student.entity_phone</label>
                    <b className={color}>{`}}`}</b>
                </span>
            </p>
            <b className="font-content2 text-sm">Variables de Curso: </b>
            <p className="leading-4 mb-2">
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.name</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.duration</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.date_start</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.date_end</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.date_start_str</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.date_end_str</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.quota</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.whatsapp</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.description</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.published</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">course.image_url</label>
                    <b className={color}>{`}}`}</b>
                </span>
            </p>
            <b className="font-content2 text-sm">Variables de Profesor: </b>
            <p className="leading-4 mb-2">
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.name</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.lastname</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.dni</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.signature</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.photo</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.email</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.role</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.description</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.facebook</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.email_verified_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.created_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.updated_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.photo_url</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">teacher.signature_url</label>
                    <b className={color}>{`}}`}</b>
                </span>
            </p>
            <b className="font-content2 text-sm">Variables de Responsable: </b>
            <p className="leading-4 mb-2">
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.id</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.name</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.lastname</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.dni</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.signature</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.photo</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.email</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.role</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.description</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.facebook</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.email_verified_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.created_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.updated_at</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.photo_url</label>
                    <b className={color}>{`}}`}</b>
                </span>
                {", "}
                <span>
                    <b className={color}>{`{{`}</b>
                    <label className="font-normal select-all">responsible.signature_url</label>
                    <b className={color}>{`}}`}</b>
                </span>
            </p>
        </div>
    );
}
