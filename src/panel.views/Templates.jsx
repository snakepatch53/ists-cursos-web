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
