import { AccountForm } from "./AccountForm";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions";

export function Header() {
  return (
    <header className="w-full border-b p-4 mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Net Worth Tracker</h1>
      <AccountForm />
      <Button variant="outline" onClick={signOut}>
        Sign Out
      </Button>
    </header>
  );
}
