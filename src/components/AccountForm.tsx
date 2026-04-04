"use client";
import { AddAccount } from "@/app/actions";
import { Button } from "./ui/button";
import { FieldLabel, Field, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AccountForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");

  const SELECT_OPTIONS = [
    { value: "checking", label: "Checking" },
    { value: "savings", label: "Savings" },
    { value: "investment", label: "Investment" },
    { value: "credit", label: "Credit Card" },
    { value: "loan", label: "Loan" },
  ];

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    AddAccount({ name, type, balance: parseFloat(balance) });
    setName("");
    setType("");
    setBalance("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="w-full" onSubmit={handleSubmit}>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="type">Type</FieldLabel>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SELECT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="balance">Balance</FieldLabel>
              <Input
                id="balance"
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Field>
            <Field>
              <Button type="submit">Add Account</Button>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
