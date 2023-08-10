import { Reviewer } from ".";

export interface ModalProps {
    isOpen?: boolean;
    closeModal?(): void;
    reviewer?: Reviewer;
}