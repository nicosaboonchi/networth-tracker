"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/supabase/database.types";

type Account = Database["public"]["Tables"]["accounts"]["Insert"];

export async function AddAccount({ name, type, balance }: Account) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("accounts")
      .insert({ name, type, balance });

    if (error) {
      throw error;
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
