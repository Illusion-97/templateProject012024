import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  API_URL = "http://localhost:3000";

  constructor(private http: HttpClient, private service: AuthService) {}

  // Une fois mis en place, TOUTES les requêtes HTTP sortantes passerons par cette méthode
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.token
    if(token && request.url.startsWith(this.API_URL)) {
      request = request.clone({
        /*headers: {} Remplace tous les headers existant par ceux fournis dans l'objet*/
        // setHeaders permet d'ajouter ou de modifier ceux fournis
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      })
    }
    return next.handle(request).pipe(catchError(err => {
      //this.http.post("LogServerURL", err)
      console.log("CatchError dans l'intercepteur")
      return throwError(() => err)
    }));
  }
}
