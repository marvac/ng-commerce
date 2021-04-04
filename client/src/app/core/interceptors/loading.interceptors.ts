import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService, private busyService: BusyService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes('checkEmail')) {
            this.busyService.busy();
        }

        return next.handle(request).pipe(
            //delay(1000), //for testing
            finalize(() => {
                this.busyService.idle();
            }));
    }
}