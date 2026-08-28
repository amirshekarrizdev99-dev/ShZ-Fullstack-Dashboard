export interface Notification {
  createdat(createdat: string): void;
  username: string;
  userimage: string ;
  isread: boolean;
  id: number;

  userName: string;
  userImage: string;

  message: string;
  project: string;

  isRead: boolean;

  createdAt: string;
}