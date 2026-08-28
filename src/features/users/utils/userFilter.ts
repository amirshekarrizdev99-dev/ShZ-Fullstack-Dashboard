import type { FilterFn } from "@tanstack/react-table";
import type { User } from "../types";

export const userGlobalFilter: FilterFn<User> = (
  row,
  _columnId,
  filterValue
) => {
  const search = String(filterValue).toLowerCase().trim();

  if (!search) {
    return true;
  }

  const user = row.original;

  const fullName =
    `${user.firstname} ${user.lastname}`.toLowerCase();

  return (
    fullName.includes(search) ||
    user.firstname.toLowerCase().includes(search) ||
    user.lastname.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search) ||
    user.country.toLowerCase().includes(search) ||
    user.status.toLowerCase().includes(search) ||
    user.role.toLowerCase().includes(search)
  );
};