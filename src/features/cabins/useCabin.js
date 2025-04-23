import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

export function useCabin() {
  // Fatching data menggunakan react query
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });

  return { isLoading, cabins, error };
}
