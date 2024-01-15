import { fetchAdapter } from "../../apiConfig";

const resource = "social-networks";

function mapNames(data) {
    return data.map(
        ({ id, name, value, url, icon, color, color2, created_at, updated_at, ...props }) => ({
            ...props,
            id,
            name,
            value,
            url,
            icon,
            color,
            color2,
            created_at,
            updated_at,
        })
    );
}

export async function getSocialNetworks() {
    const data = await fetchAdapter({ resource });
    return mapNames(data);
}

export async function storageSocialNetwork({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateSocialNetwork({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function destroySocialNetwork({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
