"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Database } from "@/lib/supabase/database.types";
import { useState } from "react";
import { UpdateAccount } from "@/app/actions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

/**
 * 1. Pass in the individual account data as props to the UpdateAccountDialog component
 * 2. Use the account data to pre-fill the input field with the current balance
 * 3. Add a form around the input field and button, and handle the form submission to update the account balance in the database
 * 4. On form submission, call a server action that updates the account balance in the database and recalculates the net worth
 */

interface UpdateAccountDialogProps {
  account: Database["public"]["Tables"]["accounts"]["Row"];
}

// TODO: fix drawer spacing

export function UpdateAccountDialog({
  account: { balance, id, type },
}: UpdateAccountDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Account</DialogTitle>
            <DialogDescription>
              Update the balance for this account. The net worth will be
              recalculated automatically.
            </DialogDescription>
          </DialogHeader>
          <UpdateForm id={id} balance={balance} type={type} />
          <DialogFooter>
            <Button type="submit" form="update-account-form">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Update Account</DialogTitle>
          <DrawerDescription>
            Update the balance for this account. The net worth will be
            recalculated automatically.
          </DrawerDescription>
        </DrawerHeader>
        <UpdateForm id={id} balance={balance} type={type} className="px-4" />
        <DrawerFooter>
          <Button type="submit" form="update-account-form">
            Save
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UpdateForm({
  id,
  balance,
  type,
  className,
}: {
  id: string;
  balance: number;
  type: string;
  className?: string;
}) {
  const [inputBalance, setInputBalance] = useState(balance);

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
    <form
      id="update-account-form"
      onSubmit={handleSubmit}
      className={className}
    >
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="balance"
          placeholder="Enter new balance"
          type="number"
          value={inputBalance}
          step={0.01}
          onChange={(e) => setInputBalance(Number(e.target.value))}
        />
      </InputGroup>
    </form>
  );
}
