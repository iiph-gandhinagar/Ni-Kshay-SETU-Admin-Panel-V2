import Swal from "sweetalert2";

export function ErrorToast(message: string) {
    Swal.fire({
        icon: "error",
        title: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: "color-danger",
        },
    });
}
export function SuccessToast(message: string) {
    Swal.fire({
        icon: "success",
        title: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: "color-primary",
        },
    });
}
export function WarningToast(title: string, message?: string, callBack?: (e: boolean) => void) {
    Swal.fire({
        icon: "warning",
        title: title,
        text: message,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonColor: "#5584ac",
        cancelButtonColor: "#A9A9A9",
        customClass: {
            popup: "color-primary",
        },
    }).then((state) => {
        if (callBack)
            callBack(state.isConfirmed);

    });
}
export function UnauthorizedToast(title: string, callBack?: (e: boolean) => void) {
    Swal.fire({
        icon: "error",
        title: title,
        confirmButtonColor: "#EA5D29",
    }).then((state) => {
        if (callBack)
            callBack(state.isConfirmed);

    });
}
