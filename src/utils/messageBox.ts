import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DEFAULT_TITLE = "에버타임 서비스포털";
const MySwal = withReactContent(Swal);

export function alertMessage(message: any, title?: string, confirmText?: string) {
    return MySwal.fire({
        title: title || DEFAULT_TITLE,
        html: message,
        width: "400px",
        heightAuto: false,
        confirmButtonText: confirmText || "확인",
        buttonsStyling: false,
    });
}

export function confirmMessage(message: any, title?: string, confirmText?: string, cancelText?: string) {
    return MySwal.fire({
        title: title || DEFAULT_TITLE,
        html: message,
        width: "400px",
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: confirmText || "확인",
        cancelButtonText: cancelText || "취소",
        buttonsStyling: false,
        reverseButtons: true
    });
}