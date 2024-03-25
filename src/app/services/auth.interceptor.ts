import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import baseURL from "./helper";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("Interceptor ejecutándose...");
      // Solo agregar el token si la solicitud es hacia tu backend
      if (req.url.includes(baseURL)) {
        const token = this.loginService.getToken();
        console.log("Token obtenido:", token);
        if (token != null) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
      }
      return next.handle(req);
    }
}  

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
