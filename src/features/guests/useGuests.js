import { useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isLoading, data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: getAllGuests,
  });

  return { isLoading, guests };
}
