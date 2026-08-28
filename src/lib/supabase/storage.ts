import { createClient } from "./client";

export async function uploadProductImage(file: File) {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}.${fileExt}`;

  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("products").getPublicUrl(filePath);

  return data.publicUrl;
}
