import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import { getToday } from "../../utils/helpers";

function GuestTableOprations() {
  return (
    <TableOperations>
      <Filter
        filterField="startDate"
        options={[
          { value: "all", label: "All" },
          {
            value: `${getToday()}`,
            label: "Booking starting today",
          },
          { value: `${getToday()}-upcoming`, label: "Upcoming bookings" },
        ]}
      />

      <SortBy
        options={[
          { value: "fullName-asc", label: "Nama (A - Z)" },
          { value: "fullName-desc", label: "Nama (Z - A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOprations;
