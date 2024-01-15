import { fetchAdapter } from "../../apiConfig";

const resource = "institutions";

function mapNames(data) {
    return data.map(({ id, name, initials, logo, url, ...props }) => ({
        ...props,
        id,
        name,
        initials,
        logo,
        url,
    }));
}

export async function getInstitutions() {
    const response = await fetchAdapter({ resource });
    return mapNames(response);
}

export async function storageInstitution({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateInstitution({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function destroyInstitution({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
