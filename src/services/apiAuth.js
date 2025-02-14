import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  // If not session return null
  if (!session.session) return null;

  // If session true on local storage then refacth data
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: dataUpdateError } = await supabase.auth.updateUser(
    updateData
  );
  if (dataUpdateError) throw new Error(dataUpdateError.message);

  // If empty avatar return
  if (!avatar) return data;

  // Delete the already present image. Check if the user already has an avatar in the storage
  const hasImage = data.user.user_metadata.avatar;
  if (hasImage) {
    const existingFilePath = data.user.user_metadata.avatar.split("/")?.at(-1);

    const { data: imageDeleteData, error: imageDeleteError } =
      await supabase.storage.from("avatars").remove([existingFilePath]);

    if (imageDeleteError) throw new Error(imageDeleteError.message);
    console.log("Deleted image ", imageDeleteData);
  }

  // Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // Update the avatar in the user
  const { data: updatedUser, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return updatedUser;
}
