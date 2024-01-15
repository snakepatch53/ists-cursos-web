import { fetchAdapter } from "../../apiConfig";

const resource = "inscriptions";

function mapNames(data) {
    return data.map(
        ({
            id,
            approval,
            certificate_code,
            student_id,
            course_id,
            created_at,
            updated_at,
            ...props
        }) => ({
            ...props,
            id,
            approval,
            certificate_code,
            student_id,
            course_id,
            created_at,
            updated_at,
        })
    );
}

export async function getInscriptions() {
    const response = await fetchAdapter({
        resource: resource + "?includeCourse=true&includeStudent=true",
    });
    return mapNames(response);
}

export async function storageInscription({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateInscription({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function destroyInscription({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}

// combo resource

export async function updateStateCertificateCode({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/update-state-and-certificate-code/" + id,
        data,
        method: "PUT",
        all: true,
    });
    return response;
}

export async function enrollRegisterStudentOrNot({ data }) {
    const response = await fetchAdapter({
        resource: resource + "/enroll-register-student-or-not",
        data,
        method: "POST",
        all: true,
    });
    return response;
}
