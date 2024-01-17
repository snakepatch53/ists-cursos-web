import { fetchAdapter } from "../../apiConfig";

const resource = "students";

function mapNames(data) {
    return data.map(
        ({
            id,
            dni,
            name,
            lastname,
            sex,
            instruction,
            address,
            email,
            cellphone,
            phone,
            description,
            entity_name,
            entity_post,
            entity_address,
            entity_phone,
            created_at,
            updated_at,
        }) => ({
            id,
            dni,
            name,
            lastname,
            sex,
            instruction,
            address,
            email,
            cellphone,
            phone,
            description,
            entity_name,
            entity_post,
            entity_address,
            entity_phone,
            created_at,
            updated_at,
        })
    );
}

export async function getStudents() {
    const response = await fetchAdapter({ resource });
    return mapNames(response);
}

export async function showStudent({ data }) {
    const response = await fetchAdapter({
        resource: resource + "/show-student",
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function storageStudent({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateStudent({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function destroyStudent({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}

// Combo resources

export async function showCertificates({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/show-certificates/" + id,
        method: "GET",
        all: true,
    });
    return response;
}
