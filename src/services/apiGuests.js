import { PAGE_SIZE } from "../utils/constant";
import supabase from "./supabase";

export async function getGuestToSelect() {
  const { data, error } = await supabase
    .from("guests")
    .select("id, fullName")
    .order("fullName", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}

export async function getAllGuests({ page, filter, sortBy }) {
  // inner berarti menggunakan INNER JOIN, sehingga hanya akan mengembalikan guest yang memiliki booking (data guests tanpa booking tidak akan muncul).
  let selestQuery =
    filter === null
      ? "id, fullName, email, nationalID, nationality, countryFlag"
      : "id, fullName, email, nationalID, nationality, countryFlag, bookings!inner(startDate)";

  // Query
  let query = supabase
    .from("guests")
    .select(selestQuery, {
      // Get data count from supabase
      count: "exact",
    })
    .order("created_at", { ascending: false });

  // Filter
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  // Sorting
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    // Pagination
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  // Get data from supabase
  const { data, error, count } = await query;

  // Error handling supabase
  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  // Return data
  return { data, count, error };
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guests could not be created");
  }

  return data;
}

export async function updateGuest(guest) {
  const { data, error } = await supabase
    .from("guests")
    .update(guest)
    .eq("id", guest.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be update");
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }

  return data;
}
