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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

type DeleteAccountDialogProps = {
  account: Database["public"]["Tables"]["accounts"]["Row"];
};

export function DeleteAccountDialog({
  account: { id, name },
}: DeleteAccountDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [input, setInput] = useState("");

  const handleDelete = async () => {
    await DeleteAccount(id);
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this account? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DeleteAccountForm name={name} setInput={setInput} />
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account? This action cannot be
            undone.
          </DialogDescription>
        </DrawerHeader>
        <DeleteAccountForm name={name} setInput={setInput} className="px-4" />
        <DrawerFooter>
          <Button
            variant="destructive"
            disabled={input !== name}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DeleteAccountForm({
  name,
  setInput,
  className,
}: {
  name: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  return (
    <form className={className}>
      <Field>
        <FieldLabel htmlFor="confirm">
          Type &quot;{name}&quot; to confirm
        </FieldLabel>
        <Input id="confirm" onChange={(e) => setInput(e.target.value)} />
      </Field>
    </form>
  );
}
