export class User {
  userType: string;
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  visits?: {date: string, doctor: string}[];
  lastLogged?: string[];
  npi?: number;
  specialty?: string;
  city?: string;
  profilePic?: string;
}
