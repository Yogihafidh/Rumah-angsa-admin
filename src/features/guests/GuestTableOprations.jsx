import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}

export default GuestTableOprations;
