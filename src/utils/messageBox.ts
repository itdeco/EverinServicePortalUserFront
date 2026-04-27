import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DEFAULT_TITLE = "알림";
const MySwal = withReactContent(Swal);

export type MessageType = 'error' | 'warning' | 'success' | 'info' | 'question';

export function alertMessage(message: any, title?: string, confirmText?: string, type?: MessageType) {
    return MySwal.fire({
        title: title || DEFAULT_TITLE,
        html: message,
        icon: type || 'error',
        width: "420px",
        heightAuto: false,
        confirmButtonText: confirmText || "확인",
        buttonsStyling: false,
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container',
            confirmButton: 'swal2-confirm',
        }
    });
}

export function successMessage(message: any, title?: string, confirmText?: string) {
    return alertMessage(message, title || "성공", confirmText, 'success');
}

export function errorMessage(message: any, title?: string, confirmText?: string) {
    return alertMessage(message, title || "오류", confirmText, 'error');
}

export function warningMessage(message: any, title?: string, confirmText?: string) {
    return alertMessage(message, title || "주의", confirmText, 'warning');
}

export function infoMessage(message: any, title?: string, confirmText?: string) {
    return alertMessage(message, title || "안내", confirmText, 'info');
}

export function confirmMessage(message: any, title?: string, confirmText?: string, cancelText?: string, type?: MessageType) {
    return MySwal.fire({
        title: title || "확인",
        html: message,
        icon: type || 'question',
        width: "420px",
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: confirmText || "확인",
        cancelButtonText: cancelText || "취소",
        buttonsStyling: false,
        reverseButtons: true,
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel',
        }
    });
}

export function confirmDeleteMessage(message: any, title?: string, confirmText?: string, cancelText?: string) {
    return MySwal.fire({
        title: title || "삭제 확인",
        html: message,
        icon: 'warning',
        width: "420px",
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: confirmText || "삭제",
        cancelButtonText: cancelText || "취소",
        buttonsStyling: false,
        reverseButtons: true,
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container',
            confirmButton: 'swal2-confirm swal2-confirm-danger',
            cancelButton: 'swal2-cancel',
        }
    });
}
