import { create } from "zustand";

export const useRegisterStore = create((set) => ({
  formData: {
    username: "",
    password: "",
    phone: "",
    verificationCode: "",
  },
  onUpdateFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value
    }
  }))
}));