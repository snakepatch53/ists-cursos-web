import { fetchAdapter } from "../../apiConfig";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

const resource = "courses";

function formatRow({
    id,
    image_url,
    name,
    duration,
    date_start,
    date_end,
    quota,
    whatsapp,
    description,
    ...props
}) {
    return {
        ...props,
        id,
        name,
        duration,
        date_start,
        date_end,
        quota,
        whatsapp,
        image_url,
        description,
        date_start_formatted: format(new Date(date_start), "cccc, dd 'de' LLLL 'del' yyyy", {
            locale: esLocale,
        }),
    };
}

function mapNames(data) {
    return data.map((row) => formatRow(row));
}

export async function getCourses() {
    const response = await fetchAdapter({
        resource:
            resource + "?includeTeacher=true&includeResponsible=true&includeInscriptions=true",
        // printResponse: true,
    });
    return mapNames(response);
}

export async function showCourse({ id }) {
    const response = await fetchAdapter({
        resource:
            resource +
            "/" +
            id +
            "?includeInscriptions=true&includeTeacher=true&includeResponsible=true",
        // printResponse: true,
    });
    const data = formatRow(response);
    return response ? data : false;
}

export async function storageCourse({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateCourse({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
        printResponse: true,
    });
    return response;
}

export async function destroyCourse({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "DELETE",
        all: true,
    });
    return response;
}
