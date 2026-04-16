import { AccountForm } from "@/components/AccountForm";
import { AccountsGroup } from "@/components/AccountsGroup";
import { NetworthChart } from "@/components/NetworthChart";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { fmtCurrency } from "@/lib/utils";

export default async function AccountsPage() {
  const supabase = await createClient();

  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: networthHistory, error: networthError } = await supabase.rpc(
    "get_net_worth_series",
    {
      end_date: new Date().toISOString().split("T")[0],
      start_date: new Date("2026-04-09").toISOString().split("T")[0],
    },
  );

  const { data: networth_total, error: networthTotalError } = await supabase
    .from("net_worth")
    .select("sum")
    .single();

  const { data: grouptotals, error: groupTotalsError } = await supabase
    .from("grouptotals")
    .select("*");

  if (networthTotalError) {
    throw networthTotalError;
  }

  if (networthError) {
    throw networthError;
  }

  if (groupTotalsError) {
    throw groupTotalsError;
  }

  if (error) {
    throw error;
  }

  const grouped = Object.groupBy(accounts, (account) => account.type);

  const accountGroups = Object.entries(grouped).map(([type, accts = []]) => ({
    type,
    total: accts.reduce((sum, account) => sum + account.balance, 0),
    accounts: accts,
  }));

  return (
    <>
      <div className="col-span-1 md:col-span-2 max-h-100">
        <NetworthChart data={networthHistory} networth={networth_total?.sum} />
      </div>
      <div className="flex flex-col gap-4">
        {accountGroups.map((group) => (
          <AccountsGroup
            key={group.type}
            type={group.type.charAt(0).toUpperCase() + group.type.slice(1)}
            count={group.accounts.length}
            total={fmtCurrency(group.total)}
            accounts={group.accounts}
          />
        ))}
      </div>
      <div>
        <AccountForm />
      </div>
    </>
  );
}
