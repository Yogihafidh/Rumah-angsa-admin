import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useCabin } from "./useCabin";
import Empty from "../../ui/Empty";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabin();
  
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"cabins"} />;

  // Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredCabins;

  if (field === "name") {
    sortedCabins = filteredCabins?.sort(
      (a, b) => a["name"].localeCompare(b["name"]) * modifier
    );
  } else {
    sortedCabins = filteredCabins?.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
