"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database } from "@/lib/supabase/database.types";

export async function signUpNewUser(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  redirect("/login");
}

// -- Account Actions -

type Account = Required<
  Pick<
    Database["public"]["Tables"]["accounts"]["Insert"],
    "name" | "type" | "balance"
  >
>;

export async function AddAccount({ name, type, balance }: Account) {
  const supabase = await createClient();

  const signed_balance =
    type === "credit" || type === "loan" ? -balance : balance;

  try {
    const { error } = await supabase
      .from("accounts")
      .insert({ name, type, balance, signed_balance });

    if (error) {
      throw error;
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

type UpdateAccountParams = Required<
  Pick<
    Database["public"]["Tables"]["accounts"]["Update"],
    "id" | "balance" | "type"
  >
>;

export async function UpdateAccount({
  id,
  balance,
  type,
}: UpdateAccountParams) {
  const supabase = await createClient();

  const signed_balance =
    type === "credit" || type === "loan" ? -balance : balance;

  const updated_at = new Date().toISOString();

  try {
    const { error } = await supabase
      .from("accounts")
      .update({ balance, signed_balance, updated_at })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
