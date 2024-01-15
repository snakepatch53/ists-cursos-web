import CrudHead from "../panel.components/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faEnvelopeOpen, faMessage, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import {
    destroyMailboxe,
    getMailboxes,
    storageMailboxe,
    updateMailboxe,
} from "../services/mailboxes";

export default function Mailbox() {
    const extraValidations = ($form, showNotification, { isEmail }) => {
        let validate = true;
        if (!isEmail($form.email.value)) {
            showNotification("El email debe ser válido");
            validate = false;
        }
        return validate;
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
        entityName: "Mensaje",
        searchFields: ["name", "phone", "email"],
        extraValidations,
        crudGet: getMailboxes,
        crudStorage: storageMailboxe,
        crudUpdate: updateMailboxe,
        crudDestroy: destroyMailboxe,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Mensajes"
                icon={faMessage}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
                showNewButton={false}
            />

            <CrudTable
                titles={["Nombre", "Celular", "Email"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.phone} />
                        <CrudTableTdText value={item.email} />

                        <CrudTableTdFlex>
                            <Button
                                text="Ver"
                                icon={faEnvelopeOpen}
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
                title="Mensaje"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
                showSaveButton={false}
                textCancel="Cerrar"
            >
                <CrudFormInput
                    label="Nombre"
                    placeholder="Escriba el nombre"
                    name="name"
                    classNameWrapper="col-span-2"
                    disabled
                />
                <CrudFormInput
                    label="Celular"
                    placeholder="Escriba el numero de celular"
                    name="phone"
                    disabled
                />

                <CrudFormInput
                    label="Email"
                    placeholder="Escriba el correo electronico"
                    name="email"
                    disabled
                />

                <CrudFormInput
                    label="Mensaje"
                    placeholder="Escriba un mensaje"
                    name="message"
                    type="textarea"
                    classNameWrapper="col-span-2"
                    className="h-40"
                    disabled
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este Mensaje?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}
