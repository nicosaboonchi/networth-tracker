import { getLastActivityDate, timeAgo } from "@/lib/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { ChartArea, Delete } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UpdateAccount } from "@/app/actions";
import { UpdateAccountDialog } from "./UpdateAccountDialog";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { Database } from "@/lib/supabase/database.types";

interface AccountRowProps {
  account: Database["public"]["Tables"]["accounts"]["Row"];
}

export function AccountRow({ account }: AccountRowProps) {
  const { name, type, balance } = account;

  return (
    <Item className="rounded-none border-x-0 border-b-0">
      <ItemMedia>
        <Avatar>
          <AvatarImage src="" alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{type}</ItemDescription>
      </ItemContent>
      <ItemContent className="items-end">
        <ItemTitle>${balance.toFixed(2)}</ItemTitle>
        <ItemDescription>
          {timeAgo(getLastActivityDate(account))}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <UpdateAccountDialog account={account} />
        <DeleteAccountDialog account={account} />
      </ItemActions>
    </Item>
  );
}
