import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useAllGuest } from "./useGuests";

function GuestTable() {
  const { isLoading, count = 0, guests = [] } = useAllGuest();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.6fr 2fr 1.6fr 1fr">
        <Table.Header>
          <div>National ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
