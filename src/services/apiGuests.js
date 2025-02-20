import supabase from "./supabase";

export async function getAllGuests() {
  let { data, error } = await supabase
    .from("guests")
    .select("id, fullName, email, nationalID, nationality, countryFlag")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
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
