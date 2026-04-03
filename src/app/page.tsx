import { AccountForm } from "@/components/AccountForm";
import { Header } from "@/components/Header";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { createClient } from "@/lib/supabase/server";
import { fmtCurrency, getLastActivityDate, timeAgo } from "@/lib/utils";
import { UpdateAccountDialog } from "@/components/UpdateAccountDialog";
import { Delete } from "lucide-react";
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog";

export default async function Home() {
  const supabase = await createClient();

  // wrap in a promise.all to fetch in parallel
  const [
    { data: accounts, error },
    { data: net_worth, error: netWorthError },
    { data: type_totals, error: typeTotalsError },
  ] = await Promise.all([
    supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase.from("net_worth").select("sum").single(),
    supabase.from("type_totals").select("*"),
  ]);

  if (error) {
    throw error;
  }

  if (netWorthError) {
    throw netWorthError;
  }

  if (typeTotalsError) {
    throw typeTotalsError;
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-4 p-4">
      <Header />
      <AccountForm />
      <div>
        <h2 className="text-lg font-semibold">Net Worth</h2>
        {fmtCurrency(net_worth.sum ?? 0)}
      </div>
      <div>
        <h2 className="text-lg font-semibold">Totals by Type</h2>
        {type_totals.map((typeTotal) => (
          <div key={typeTotal.type}>
            {typeTotal.type}: {fmtCurrency(typeTotal.total ?? 0)}
          </div>
        ))}
      </div>
      {accounts.map((account) => (
        <Item key={account.id} variant="muted">
          <ItemContent>
            <ItemTitle>{account.name}</ItemTitle>
            <ItemDescription>
              {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
            </ItemDescription>
          </ItemContent>
          <ItemContent className="items-end">
            <ItemTitle>{fmtCurrency(account.balance)}</ItemTitle>
            <ItemDescription>
              {timeAgo(getLastActivityDate(account))}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <UpdateAccountDialog account={account} />
            <DeleteAccountDialog account={account} />
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
