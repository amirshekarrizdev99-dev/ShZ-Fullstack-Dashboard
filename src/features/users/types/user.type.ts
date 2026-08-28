export interface User {
  createdat: string | number | Date;
  firstname: string;
  lastname: string;
  id: number;


  email: string;

  avatar: string;

  role: "Admin" | "Manager" | "Editor" | "User";

  status: "online" | "offline";

  country: string;

  createdAt: string;
}