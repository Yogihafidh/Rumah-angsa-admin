import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingGuest, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestApi,
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

  return { isDeletingGuest, deleteGuest };
}
