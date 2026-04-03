# Architecture

## Overview

A personal net worth tracker that aggregates balances across financial institutions and account types into a single dashboard. Built to replace a manaul Excel workflow with automatic balance syncing and historical net worth charting. Designed to support multiple users.

## Tech Stack

| Technology | Role                                         |
| ---------- | -------------------------------------------- |
| Next.js    | Frontend + server actions                    |
| Supabase   | Postgres + Auth + RLS                        |
| Plaid      | Financial account aggregation and connection |

## Features

### Current

- [ ] Manaul account creation with type/subtype classificiation
- [ ] Account List grouped by type with balance totals

### In progress

- [ ] Supabase Auth + RLS policys
- [ ] Edit and delete accounts
- [ ] Balance snapshots capture

### Updating a balance

What we need: 
- the id of the account to target the change
- the new value to change the balance to
-  the updated timestamp.
- a user interface to edit the account

Dialog component takes in the account id, the name, and balance, input field with current balance to change to updated balance. Save button calls update action on the server

### Snapshots

Each day a record of each accounts balance is captured only once. We can store the `signed_balance` and `display_balance` with a snapshot_date and account_id as the FK. These will be used to aggregate net worth into daily totals over time.

What we Need: 
 - snapshots table to relate the snapshot to the account
 - the new balance to update and its sign depending on the type of account
 - a snapshot trigger, we will reuse the update/edit button on each account

 The flow:
 1. User clicks edit on an account
 2. New balance is entered for the account
 3. Update the new `balance` and `updated_at` in the `accounts` table
 4. Upsert the new `balance` and date into the `balance_snapshots` table
 5. If a balance for today already exists we update it (contrained on todays date and account_id)
 6. If balance doesnt exist we insert new snapshot
 7. a view groups by date and sums the total for each date


