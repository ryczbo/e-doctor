import { UserService } from "./user.service";
import { AuthenticationService } from "./authentication.service";
import { AlertService } from "./alert.service";
import { ErrorInterceptor } from "./error.interceptor";
import { FakeBackendInterceptor } from "./fake-backend";
import { JwtInterceptor } from "./jwt.interceptor";
import { RegisterService } from "./register.service";

export const SharedServices = [
  UserService,
  AuthenticationService,
  AlertService,
  ErrorInterceptor,
  FakeBackendInterceptor,
  JwtInterceptor,
  RegisterService
];

export {
  UserService,
  AuthenticationService,
  AlertService,
  ErrorInterceptor,
  FakeBackendInterceptor,
  JwtInterceptor,
  RegisterService
};
