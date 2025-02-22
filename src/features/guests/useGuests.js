import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useAllGuest() {
  const queryClient = useQueryClient();
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

  const {
    isLoading,
    error,
    data: { data: guests, count } = {},
  } = useQuery({
    queryFn: () => getAllGuests({ page, filter }),
    queryKey: ["guests", page, filter],
  });

  // Pre-fatching guest data in pagenation
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1, filter],
      queryFn: () => getAllGuests({ page: page + 1, filter }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page - 1, filter],
      queryFn: () => getAllGuests({ page: page - 1, filter }),
    });
  }

  return { isLoading, guests, count, error };
}
