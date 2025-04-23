import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  // Get cabins data from the database using Supabase's query builder.
  const { data, error } = await supabase.from("cabins").select("*");

  // Check if there was an error fetching cabins data.
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // Mengecek apakah image yang diberikan sudah memiliki path dari Supabase
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Membuat nama unik untuk image dengan menambahkan angka random di depannya serta memastikan tidak ada karakter "/" dalam nama file
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  // Jika image sudah memiliki path dari Supabase, gunakan path tersebut. Jika tidak, buat path baru untuk penyimpanan di Supabase Storage
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]) // Menyimpan cabin dengan path gambar yang baru
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Mengunggah image ke Supabase Storage pada folder "cabin-images"
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function updateCabin(cabin) {
  // Mengecek apakah gambar yang diberikan sudah memiliki path dari Supabase
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  // Membuat nama unik untuk image dengan menambahkan angka random di depannya serta memastikan tidak ada karakter "/" dalam nama file
  const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");

  // Jika image sudah memiliki path dari Supabase, gunakan path tersebut. Jika tidak, buat path baru untuk penyimpanan di Supabase Storage
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Update Cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath }) // Update cabin dengan path gambar yang baru
    .eq("id", cabin.id) // Update cabin berdasarkan id
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be update");
  }

  // 2. Jika gambar tidak berubah (sudah ada path dari Supabase), langsung kembalikan data
  if (hasImagePath) return data;

  // 3. Upload gambar baru ke Supabase Storage pada folder "cabin-images"
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  // 3. Delete the cabin if there was an error uploading the new image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
