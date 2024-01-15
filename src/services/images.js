import { fetchAdapter } from "../../apiConfig";

const resource = "images";

function mapNames(data) {
    return data.map(({ id, image, description, created_at, updated_at, image_url }) => ({
        id,
        image,
        description,
        created_at,
        updated_at,
        image_url,
    }));
}

export async function getImages() {
    const response = await fetchAdapter({ resource });
    return mapNames(response);
}

export async function storageImage({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateImage({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function destroyImage({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
