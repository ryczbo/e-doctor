export class User {
  userType: string;
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  visits?: {date: string, hour: string, userId: number, status: string, userName: string, read?: boolean }[];
  lastLogged?: string[];
  npi?: number;
  specialty?: string;
  city?: string;
  profilePic?: string;
}
