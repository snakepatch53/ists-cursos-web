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
import { faImage, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimateElement from "../components/AnimateElement";
import "react-notifications-component/dist/theme.css";
import useCrudPanel from "../hooks/useCrudPanel";
import { destroyImage, getImages, storageImage, updateImage } from "../services/images";

export default function Slider() {
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
        entityName: "Slide",
        searchFields: ["description"],
        isStorageMultipartFormData: true,
        isUpdateMultipartFormData: true,
        excludeFieldsValidationEdit: ["image"],
        crudGet: getImages,
        crudStorage: storageImage,
        crudUpdate: updateImage,
        crudDestroy: destroyImage,
    });

    return (
        <AnimateElement className="flex flex-col gap-7 w-full">
            <CrudHead
                title="Slides"
                icon={faImage}
                isOpen={head}
                onClickNew={handleModeNew}
                searchValue={searchValue}
                searchOnChange={searchOnChange}
            />

            <CrudTable
                titles={["Imagen", "Descripcion"]}
                dataList={datalist}
                isOpen={table}
                onRowPrint={(item) => (
                    <tr key={item.id}>
                        <CrudTableTdImage src={item.image_url} alt={"Logo de " + item.name} />

                        <CrudTableTdText value={item.description} />

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
                title="Slide"
                isOpen={form}
                onClickCancel={hanleCancel}
                onSubmit={handleSubmit}
                formRef={$form}
            >
                <CrudFormInput
                    label="Imagen"
                    type="file"
                    name="image"
                    accept="image/jpg"
                    required
                />

                <CrudFormInput
                    label="Descripción"
                    placeholder="Escriba una descripción de la imagen"
                    name="description"
                    required
                />
            </CrudForm>

            <CrudConfirm
                isOpen={confirm}
                text="¿Seguro de eliminar este slide?"
                onClickDelete={handleDelete}
                onClickCancel={hanleCancel}
            />

            <CrudProgress isOpen={progress} text="Procesando tu solicitud..." />
        </AnimateElement>
    );
}
