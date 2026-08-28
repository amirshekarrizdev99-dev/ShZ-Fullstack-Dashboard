import type { FilterFn } from "@tanstack/react-table";
import type { Order } from "../types";

export const orderGlobalFilter: FilterFn<Order> = (
  row,
  _columnId,
  filterValue,
) => {
  const search = String(filterValue ?? "")
    .toLowerCase()
    .trim();

  if (!search) {
    return true;
  }

  const order = row.original;

  return (
    String(order.id).toLowerCase().includes(search) ||
    order.ordernumber.toLowerCase().includes(search) ||
    order.customername.toLowerCase().includes(search) ||
    order.customeremail.toLowerCase().includes(search) ||
    order.product.toLowerCase().includes(search) ||
    order.category.toLowerCase().includes(search) ||
    order.status.toLowerCase().includes(search) ||
    order.paymentstatus.toLowerCase().includes(search) ||
    order.paymentmethod.toLowerCase().includes(search) ||
    order.country.toLowerCase().includes(search)
  );
};
