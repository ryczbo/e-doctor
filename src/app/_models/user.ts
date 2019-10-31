export class User {
  userType: string;
  _id: any;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  visits?: {date: string, hour: string, id: number, status: string, patientName: string,
    doctorName: string, patientId: number, doctorId: number, read?: boolean,
    exam?: {weight: number, heartRate: number, bloodPressure: number, medHistory: string,
    diagnosis: string, prescription: string, advices: string} }[];
  lastLogged?: string[];
  npi?: number;
  specialty?: string;
  city?: string;
  profilePic?: string;
  rates?: any[];
  rating?: number;
}
