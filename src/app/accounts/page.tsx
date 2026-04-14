import { AccountsGroup } from "@/components/AccountsGroup";
import { NetworthChart } from "@/components/NetworthChart";

export default function AccountsPage() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div className="col-span-2 h-100">
        <NetworthChart />
      </div>
      <AccountsGroup />
      <div>content</div>
    </div>
  );
}
