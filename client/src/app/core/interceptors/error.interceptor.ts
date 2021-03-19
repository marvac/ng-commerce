import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status == 404) {
            this.router.navigateByUrl('/not-found');
          }
          else if (error.status == 500) {
            const navExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/server-error', navExtras);
          }
          else {
            this.toastr.error(error.error.message, error.error.statusCode);
          }
        }

        return throwError(error);
      })
    );
  }
}
