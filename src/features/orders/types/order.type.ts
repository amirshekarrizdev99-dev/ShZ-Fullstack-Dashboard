export type OrderStatus = "Delivered" | "Pending" | "Processing" | "Cancelled";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type PaymentMethod = "Credit Card" | "PayPal" | "Cash";

export interface Order {
  ordernumber: string;
  customeremail: string;
  customername: string;
  image: string;
  id: number;
  customerid: number;
  product: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  status: OrderStatus;
  paymentstatus: PaymentStatus;
  paymentmethod: PaymentMethod;
  country: string;
  createdat: string;
}
