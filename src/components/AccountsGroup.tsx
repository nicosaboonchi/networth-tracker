import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AccountRow } from "./AccountRow";
import { ChevronDown } from "lucide-react";
import { ItemGroup } from "./ui/item";
import { Database } from "@/lib/supabase/database.types";

interface AccountsGroupProps {
  type: string;
  total: string;
  count: number;
  accounts: Database["public"]["Tables"]["accounts"]["Row"][];
}

export function AccountsGroup({
  type,
  total,
  count,
  accounts,
}: AccountsGroupProps) {
  return (
    <Collapsible defaultOpen className="rounded-lg border overflow-hidden">
      <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2.5 bg-muted/50 hover:bg-muted">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform in-data-[state=open]:rotate-180" />
          <span className="font-medium text-lg">{type}</span>
          <span className="text-muted-foreground text-base">
            {count} accounts
          </span>
        </div>
        <span className="font-medium text-lg">{total}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ItemGroup className="gap-0">
          {accounts.map((account) => (
            <AccountRow key={account.id} account={account} />
          ))}
        </ItemGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
