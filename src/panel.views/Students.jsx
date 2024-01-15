import CrudHead from "../panel.components/CrudHead";
import { CrudTable, CrudTableTdFlex, CrudTableTdText } from "../panel.components/CrudTable";
import { CrudForm, CrudFormInput } from "../panel.components/CrudForm";
import CrudConfirm from "../panel.components/CrudConfirm";
import CrudProgress from "../panel.components/CrudProgress";
import Button from "../panel.components/Button";
import { faPen, faTrash, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import { destroyStudent, getStudents, storageStudent, updateStudent } from "../services/students";

export default function Students() {
    const extraValidations = ($form, showNotification, { isEmail, isCedula }) => {
        let validate = true;
        if (!isCedula($form.dni.value)) {
            showNotification("El númedo de cedula debe ser válido");
            validate = false;
        }
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
        entityName: "Estudiante",
        searchFields: ["name", "lastname", "dni", "email"],
        extraValidations,
        crudGet: getStudents,
        crudStorage: storageStudent,
        crudUpdate: updateStudent,
        crudDestroy: destroyStudent,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Estudiantes"
                icon={faUserGraduate}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Cedula", "Nombres", "Apellidos", "Celular", "Email"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdText value={item.dni} />

                        <CrudTableTdText value={item.name} />
                        <CrudTableTdText value={item.lastname} />
                        <CrudTableTdText value={item.cellphone} />
                        <CrudTableTdText value={item.email} />

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
                title="Estudiante"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
            >
                <CrudFormInput
                    label="Cedula"
                    placeholder="Escriba el numero de cedula"
                    name="dni"
                    required
                />
                <CrudFormInput
                    label="Nombres"
                    placeholder="Escriba los nombres del estudiante"
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
                    name="sex"
                    label="Sexo"
                    type="radio"
                    radioOptions={[
                        { value: "Masculino", label: "Masculino" },
                        { value: "Femenino", label: "Femenino" },
                        { value: "Otro", label: "Otro", checked: true },
                    ]}
                    required
                />
                <CrudFormInput
                    name="instruction"
                    label="Sexo"
                    type="radio"
                    radioOptions={[
                        { value: "Primaria", label: "Primaria" },
                        { value: "Secundaria", label: "Secundaria" },
                        { value: "Técnico", label: "Técnico" },
                        { value: "Superior", label: "Superior", checked: true },
                    ]}
                    required
                />
                <CrudFormInput
                    label="Dirección"
                    placeholder="Escriba la dirección del estudiante"
                    name="address"
                    required
                />
                <CrudFormInput
                    label="Email"
                    placeholder="Ingrese el email del estudiante"
                    name="email"
                    required
                />

                <CrudFormInput
                    label="Celular "
                    placeholder="Escriba el número de celular"
                    name="cellphone"
                    required
                />
                <CrudFormInput
                    label="Telefono "
                    placeholder="Escriba el número de telefono"
                    name="phone"
                    required
                />
                <CrudFormInput
                    label="Descripción "
                    placeholder="Escriba una descripción del estudiante"
                    name="description"
                    required
                />

                <CrudFormInput
                    label="Nombre/Empresa"
                    placeholder="Escriba el nombre de la empresa"
                    name="entity_name"
                    required
                />
                <CrudFormInput
                    label="Dirección/Empresa"
                    placeholder="Escriba la dirección de la empresa"
                    name="entity_address"
                    required
                />
                <CrudFormInput
                    label="Cargo/Empresa"
                    placeholder="Escriba el cargo del estudiante"
                    name="entity_post"
                    required
                />
                <CrudFormInput
                    label="Telefono/Empresa"
                    placeholder="Escriba el número de telefono de la empresa"
                    name="entity_phone"
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este estudiante?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}
