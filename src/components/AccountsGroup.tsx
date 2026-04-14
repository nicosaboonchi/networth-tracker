"use client";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AccountsGroup() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between border-b-2">
          Accounts
          <ChevronDown className="transition-transform data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-x-2 border-b-2 rounded-b-md">
        <Item className="border-0 rounded-none" variant="muted">
          <ItemContent>
            <ItemTitle>Checking Account</ItemTitle>
            <ItemDescription>Balance: $1,000</ItemDescription>
          </ItemContent>
        </Item>
        <Item className="border-0">
          <ItemContent>
            <ItemTitle>Savings Account</ItemTitle>
            <ItemDescription>Balance: $5,000</ItemDescription>
          </ItemContent>
        </Item>
      </CollapsibleContent>
    </Collapsible>
  );
}
