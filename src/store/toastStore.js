import { create } from 'zustand';

let timeoutId = null;

const useToastStore = create((set) => ({
    toast: {
        type: '',
        message: '',
    },

    showToast: (type, message) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }


        set({ toast: { type, message } });


        timeoutId = setTimeout(() => {
            set({ toast: { type: '', message: '' } });
            timeoutId = null;
        }, 5000);
    },

    hideToast: () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        set({ toast: { type: '', message: '' } });
    },
}));

export default useToastStore;
