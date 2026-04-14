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
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog";
import { NetworthChart } from "@/components/NetworthChart";

export default async function Home() {
  const supabase = await createClient();

  // wrap in a promise.all to fetch in parallel
  const [
    { data: accounts, error },
    { data: net_worth, error: netWorthError },
    { data: type_totals, error: typeTotalsError },
    { data: networth_history, error: netWorthHistoryError },
  ] = await Promise.all([
    supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase.from("net_worth").select("sum").single(),
    supabase.from("type_totals").select("*"),
    supabase.rpc("get_net_worth_series", {
      end_date: new Date().toISOString().split("T")[0],
      start_date: new Date("2026-04-08").toISOString().split("T")[0],
    }),
  ]);

  console.log(networth_history);
  if (error) {
    throw error;
  }

  if (netWorthError) {
    throw netWorthError;
  }

  if (typeTotalsError) {
    throw typeTotalsError;
  }

  if (netWorthHistoryError) {
    throw netWorthHistoryError;
  }

  const accountsByType = Object.groupBy(accounts, (account) => account.type);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Header />
      <NetworthChart
        data={networth_history}
        networth={fmtCurrency(net_worth.sum ?? 0)}
      />
      <div>
        <h2 className="text-lg font-semibold">Totals by Type</h2>
        {type_totals.map((typeTotal) => (
          <div key={typeTotal.type}>
            {typeTotal.type}: {fmtCurrency(typeTotal.total ?? 0)}
          </div>
        ))}
      </div>
      {Object.entries(accountsByType).map(([type, accounts]) => (
        <div key={type} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            {type.charAt(0).toUpperCase() + type.slice(1)} Accounts
          </h2>
          {accounts?.map((account) => (
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
      ))}
    </div>
  );
}
