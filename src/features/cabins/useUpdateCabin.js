import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isUpdate, mutate: updateCabin } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully update");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdate, updateCabin };
}
