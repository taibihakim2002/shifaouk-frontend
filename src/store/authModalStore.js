import { create } from "zustand";
const useAuthModalStore = create((set) => ({
    isOpen: false,
    modalType: null,
    openModal: (type) => set(() => ({ isOpen: true, modalType: type })),
    closeModal: () => set(() => ({ isOpen: false, modalType: null }))
}))

export default useAuthModalStore;