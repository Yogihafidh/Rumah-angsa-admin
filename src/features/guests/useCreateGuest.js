import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest as createGuestApi } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingGuest, mutate: createGuest } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("New Guest successfully created");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreatingGuest, createGuest };
}
