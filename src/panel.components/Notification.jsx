import { ReactNotifications, Store } from "react-notifications-component";

export function Notification() {
    return <ReactNotifications />;
}

export function showNotification({ title, message, type = "success", duration = 5000 }) {
    Store.addNotification({
        title,
        message,
        type,
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration,
            onScreen: true,
        },
    });
}
