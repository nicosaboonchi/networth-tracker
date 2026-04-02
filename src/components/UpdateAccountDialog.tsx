"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Database } from "@/lib/supabase/database.types";
import React from "react";
import { UpdateAccount } from "@/app/actions";

/**
 * 1. Pass in the individual account data as props to the UpdateAccountDialog component
 * 2. Use the account data to pre-fill the input field with the current balance
 * 3. Add a form around the input field and button, and handle the form submission to update the account balance in the database
 * 4. On form submission, call a server action that updates the account balance in the database and recalculates the net worth
 */

interface UpdateAccountDialogProps {
  account: Database["public"]["Tables"]["accounts"]["Row"];
}

export function UpdateAccountDialog({
  account: { balance, id, type },
}: UpdateAccountDialogProps) {
  const [inputBalance, setInputBalance] = React.useState(balance);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // prevent default form submission behavior
    e.preventDefault();

    // call server action to update account balance in database
    await UpdateAccount({
      id,
      balance: inputBalance,
      type,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
        </DialogHeader>
        <form id="update-account-form" onSubmit={handleSubmit}>
          <Input
            id="balance"
            placeholder="Enter new balance"
            type="number"
            value={inputBalance}
            onChange={(e) => setInputBalance(Number(e.target.value))}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="update-account-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
