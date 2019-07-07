export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  visits?: {date: string, diagnosis: string, meds: string}[];
}
