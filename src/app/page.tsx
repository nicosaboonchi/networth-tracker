import { AccountForm } from "@/components/AccountForm";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: accounts, error } = await supabase.from("accounts").select("*");

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-4 p-4">
      <AccountForm />
      {accounts.map((account) => (
        <Item key={account.id} variant="muted">
          <ItemContent>
            <ItemTitle>{account.name}</ItemTitle>
            <ItemDescription>
              {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
            </ItemDescription>
          </ItemContent>
          <ItemContent className="items-end">
            <ItemTitle>${account.balance.toFixed(2)}</ItemTitle>
            <ItemDescription>
              Created at:{" "}
              {account.created_at &&
                new Date(account.created_at).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
