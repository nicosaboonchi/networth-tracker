"use client";

import { Database } from "@/lib/supabase/database.types";
import { Button } from "./ui/button";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { DeleteAccount } from "@/app/actions";

type DeleteAccountDialogProps = {
  account: Database["public"]["Tables"]["accounts"]["Row"];
};

export function DeleteAccountDialog({
  account: { id, name },
}: DeleteAccountDialogProps) {
  const [input, setInput] = useState("");

  const handleDelete = async () => {
    await DeleteAccount(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="confirm">
            Type &quot;{name}&quot; to confirm
          </FieldLabel>
          <Input id="confirm" onChange={(e) => setInput(e.target.value)} />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={input !== name}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
