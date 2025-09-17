import { authKeys } from "./key";
import { endpoints } from "@/api/endpoints";
import { RegisterFormPayload } from "./schema";
import axiosInstance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

/// User Regsiter
export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: [authKeys.auth_register],
    mutationFn: async (body: RegisterFormPayload) => {
      const res = await axiosInstance.post(
        endpoints.auth.register,
        body
      );

      return res.data;
    }
  });
};