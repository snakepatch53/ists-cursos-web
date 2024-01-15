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
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import { destroyUser, getUsers, storageUser, updateUser } from "../services/users";
import useCrudPanel from "../hooks/useCrudPanel";

export default function Users() {
    const extraValidations = ($form, showNotification, { isEmail, isCedula }) => {
        let validate = true;
        if ($form.password?.value && $form.password?.value?.length < 8) {
            showNotification("La contraseña debe tener minimo 8 caracteres");
            validate = false;
        }
        if ($form.photo?.files?.length && $form.photo?.files[0]?.size > 2000000) {
            showNotification("La foto debe pesar maximo 2MB");
            validate = false;
        }
        if ($form.signature?.files?.length && $form.signature?.files[0]?.size > 2000000) {
            showNotification("La firma debe pesar maximo 2MB");
            validate = false;
        }
        if (!isEmail($form.email?.value)) {
            showNotification("El correo electronico no es valido");
            validate = false;
        }
        if (!isCedula($form.dni?.value)) {
            showNotification("La cedula no es valida");
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
        entityName: "Entidad",
        excludeFieldsValidationEdit: ["password", "photo", "signature"],
        searchFields: ["name", "lastname", "dni", "email", "role"],
        extraValidations,
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        crudGet: getUsers,
        crudStorage: storageUser,
        crudUpdate: updateUser,
        crudDestroy: destroyUser,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Usuarios"
                icon={faUsers}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Foto", "Nombre", "DNI", "Email", "Privilegio"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.photo_url} alt={"Foto " + item.name} />
                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.dni} />
                        <CrudTableTdText value={item.email} />
                        <CrudTableTdText value={item.role} />
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
                title="Usuario"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                // message={msg}
                formRef={$form}
            >
                <CrudFormInput
                    label="Nombres"
                    placeholder="Escriba los nombres"
                    name="name"
                    required
                />
                <CrudFormInput
                    label="Apellidos"
                    placeholder="Escriba los apellidos"
                    name="lastname"
                    required
                />

                <CrudFormInput
                    label="Cedula "
                    placeholder="Escriba el de cedula"
                    name="dni"
                    required
                />

                <CrudFormInput
                    label="Correo Electronico"
                    placeholder="Escriba el correo electronico"
                    name="email"
                    required
                />
                <CrudFormInput
                    label="Contraseña"
                    placeholder="Escriba la contraseña"
                    type="password"
                    name="password"
                    required
                />
                <CrudFormInput
                    name="role"
                    label="Privilegios"
                    placeholder="Privilegios"
                    type="select"
                    required
                    id="role"
                >
                    <option value="">Seleccione..</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Responsable">Responsable</option>
                    <option value="Profesor">Profesor</option>
                </CrudFormInput>
                <CrudFormInput
                    label="Facebook"
                    placeholder="Ingrese el Link de Facebook"
                    name="facebook"
                    required
                />
                <CrudFormInput
                    label="Descripcion"
                    placeholder="Escriba la descripción"
                    name="description"
                    type="textarea"
                    required
                />
                <CrudFormInput label="Foto" name="photo" type="file" required />
                <CrudFormInput
                    label="Firma"
                    type="file"
                    name="signature"
                    accept="image/png"
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
