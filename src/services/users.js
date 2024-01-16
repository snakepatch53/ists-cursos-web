import { fetchAdapter } from "./../../apiConfig";

const resource = "users";

function mapNames(data) {
    return data.map(
        ({
            id,
            name,
            lastname,
            dni,
            signature,
            email,
            role,
            created_at,
            updated_at,
            photo_url,
            signature_url,
            description,
            facebook,
            ...props
        }) => ({
            id,
            name,
            lastname,
            dni,
            signature,
            email,
            created_at,
            updated_at,
            photo_url,
            signature_url,
            role,
            description,
            facebook,
            ...props,
        })
    );
}

export async function getUsers() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true
    });
    return mapNames(response);
}

export async function storageUser({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateUser({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function updateUserSession({ data }) {
    const response = await fetchAdapter({
        resource: "update-user-session",
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyUser({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}

export async function login({ data }) {
    const response = await fetchAdapter({
        resource: "login",
        data,
        method: "POST",
    });
    if (response.success) window.localStorage.setItem("session", JSON.stringify(response));
    return response;
}

export async function logout() {
    const response = await fetchAdapter({
        resource: "logout",
        method: "POST",
        // all: true,
        // printResponse: true,
    });
    return response;
}
