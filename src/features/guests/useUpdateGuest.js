import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGuest as updateGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useUpdateGuest() {
  const queryClient = useQueryClient();
  const { isPending: isUpdateGuest, mutate: updateGuest } = useMutation({
    mutationFn: updateGuestApi,
    onSuccess: () => {
      toast.success("Guest Successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error.message);
    },
  });

  return { isUpdateGuest, updateGuest };
}
