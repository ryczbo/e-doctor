export class User {
  userType: string;
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  visits?: {date: string, diagnosis: string, meds: string}[];
  lastLogged?: string[];
  npi?: number;
  specialty?: string;
  city?: string;
}
