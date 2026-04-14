import { AccountForm } from "@/components/AccountForm";
import { AccountsGroup } from "@/components/AccountsGroup";
import { NetworthChart } from "@/components/NetworthChart";
import { createClient } from "@/lib/supabase/server";

export default async function AccountsPage() {
  const supabase = await createClient();

  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const checkingAccounts = accounts.filter(
    (account) => account.type === "checking",
  );

  const savingsAccounts = accounts.filter(
    (account) => account.type === "savings",
  );

  const investmentAccounts = accounts.filter(
    (account) => account.type === "investment",
  );

  const creditAccounts = accounts.filter(
    (account) => account.type === "credit",
  );

  console.log(checkingAccounts);

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 p-6">
      <div className="col-span-2 h-100">
        <NetworthChart />
      </div>
      <div className="flex flex-col gap-4">
        <AccountsGroup
          type="Checking"
          total={2000.0}
          count={checkingAccounts.length}
          accounts={checkingAccounts}
        />
        <AccountsGroup
          type="Savings"
          total={5000.0}
          count={savingsAccounts.length}
          accounts={savingsAccounts}
        />
        <AccountsGroup
          type="Investments"
          total={15000.0}
          count={investmentAccounts.length}
          accounts={investmentAccounts}
        />
        <AccountsGroup
          type="Credit Cards"
          total={15000.0}
          count={creditAccounts.length}
          accounts={creditAccounts}
        />
      </div>
      <div>
        <AccountForm />
      </div>
    </div>
  );
}
