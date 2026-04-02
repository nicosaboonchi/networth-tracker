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



