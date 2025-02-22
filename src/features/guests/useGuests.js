import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";

export function useAllGuest() {
  // const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Filter Guest
  const filterValue = searchParams.get("startDate");
  const isUpcoming = filterValue?.includes("upcoming"); // Check if the filter is upcoming
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "bookings.startDate",
          value: isUpcoming
            ? filterValue.split("-").slice(0, -1).join("-")
            : filterValue,
          method: isUpcoming ? "gt" : "eq",
        }; // Create filter object

  // Sorting Guest
  const sortByRaw = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    error,
    data: { data: guests, count } = {},
  } = useQuery({
    queryFn: () => getAllGuests({ page, filter, sortBy }),
    queryKey: ["guests", page, filter, sortBy],
    placeholderData: keepPreviousData,
  });

  return { isLoading, guests, count, error };
}
