import { fetchAdapter } from "../../apiConfig";

const resource = "templates";

function mapNames(data) {
    return data.map(({ id, name, code, created_at, updated_at, ...props }) => ({
        ...props,
        id,
        name,
        code,
        created_at,
        updated_at,
    }));
}

export async function getTemplates() {
    const response = await fetchAdapter({ resource });
    return mapNames(response);
}

export async function storageTemplate({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateTemplate({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function destroyTemplate({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
