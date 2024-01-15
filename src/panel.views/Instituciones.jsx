import CrudHead from "../panel.components/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdImage,
    CrudTableTdUrl,
} from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faInstitution, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import {
    destroyInstitution,
    getInstitutions,
    storageInstitution,
    updateInstitution,
} from "../services/institutions";

export default function Instituciones() {
    const extraValidations = ($form, showNotification, { isUrl }) => {
        if (!isUrl($form.url.value)) {
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
        entityName: "Institucion",
        searchFields: ["name", "initials"],
        extraValidations,
        gender: false,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getInstitutions,
        crudStorage: storageInstitution,
        crudUpdate: updateInstitution,
        crudDestroy: destroyInstitution,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Instituciones"
                icon={faInstitution}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Logo", "Link"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.logo_url} alt={"Logo de " + item.name} />

                        <CrudTableTdUrl
                            value={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                        />

                        <CrudTableTdFlex>
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
                title="Institucion"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
            >
                <CrudFormInput
                    label="Nombre"
                    placeholder="Escriba el nombre"
                    name="name"
                    required
                />
                <CrudFormInput
                    label="Iniciales"
                    placeholder="Escriba las siglas"
                    name="initials"
                    required
                />
                <CrudFormInput
                    label="Link"
                    placeholder="Escriba el link, ejm: http://fb.com/@ists"
                    name="url"
                    required
                />

                <CrudFormInput label="Logo" type="file" name="logo" accept="image/png" required />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar esta institucion?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}
