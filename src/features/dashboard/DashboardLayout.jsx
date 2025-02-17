import styled from "styled-components";
import { useRecentBookings } from "../bookings/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "../bookings/useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabin } = useCabin();

  if (isLoadingBookings || isLoadingStays || isLoadingCabin) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Todays activity</div>
      <div>Chart stay durations</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
