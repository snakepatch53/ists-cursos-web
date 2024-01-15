import { fetchAdapter } from "../../apiConfig";

const resource = "mailboxes";

function mapNames(data) {
    return data.map(({ id, name, phone, email, message }) => ({
        id,
        name,
        phone,
        email,
        message,
    }));
}

export async function getMailboxes() {
    const response = await fetchAdapter({ resource });
    return mapNames(response);
}

export async function storageMailboxe({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateMailboxe({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function destroyMailboxe({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
