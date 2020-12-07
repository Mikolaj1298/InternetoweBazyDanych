import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private token: TokenStorageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token.getToken() != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer  ' + this.token.getToken())
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {
          },
          err => {
            if (err.status === 401) {
              this.token.removeToken();
              // this.router.navigateByUrl('/login/company');
            } else if (err.status === 403) {
              // this.router.navigateByUrl('/login/company');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}
