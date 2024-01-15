import CrudHead from "../panel.components/CrudHead";
import {
    CrudTable,
    CrudTableTdFlex,
    CrudTableTdSvg,
    CrudTableTdUrl,
} from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faLink, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import {
    destroySocialNetwork,
    getSocialNetworks,
    storageSocialNetwork,
    updateSocialNetwork,
} from "../services/social-networks";

export default function Redes() {
    const extraValidations = ($form, showNotification, { isUrl, isOtherUrl }) => {
        if (!isUrl($form.url.value) && !isOtherUrl($form.url.value)) {
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
        entityName: "Red Social",
        searchFields: ["name", "value"],
        extraValidations,
        gender: false,
        crudGet: getSocialNetworks,
        crudStorage: storageSocialNetwork,
        crudUpdate: updateSocialNetwork,
        crudDestroy: destroySocialNetwork,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Redes Sociales"
                icon={faLink}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Link", "Icono"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdUrl
                            href={item.url}
                            value={item.name}
                            target="_blank"
                            rel="noreferrer"
                        />
                        <CrudTableTdSvg code={item.icon} fill={item.color} />
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
                title="Red Social"
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
                    label="Valor"
                    placeholder="Escriba el valor, ejm: @ists"
                    name="value"
                    required
                />

                <CrudFormInput
                    label="Link"
                    placeholder="Escriba el link, ejm: http://fb.com/@ists"
                    name="url"
                    required
                />

                <CrudFormInput
                    label="Icono SVG"
                    placeholder="Inserte el codigo SVG del icono"
                    name="icon"
                    required
                />
                <CrudFormInput
                    label="Color 1"
                    placeholder="Seleccione el color 1"
                    type="color"
                    name="color"
                    required
                />
                <CrudFormInput
                    label="Color 2"
                    placeholder="Seleccione el color 2"
                    type="color"
                    name="color2"
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este usuario?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}
