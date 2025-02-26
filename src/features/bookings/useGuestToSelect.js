import { useQuery } from "@tanstack/react-query";
import { getGuestToSelect } from "../../services/apiGuests";

export function useGuestToSelect() {
  const { isLoading, data: GuestForBooking } = useQuery({
    queryKey: ["GuestForBooking"],
    queryFn: getGuestToSelect,
  });

  return { isLoading, GuestForBooking };
}
