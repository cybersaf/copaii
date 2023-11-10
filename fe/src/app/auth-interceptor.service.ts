import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService} from '@nebular/auth';
import {catchError, tap} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService, private toastrService: NbToastrService, private router: Router) {
  }

  // noinspection JSUnusedLocalSymbols
  onSuccess(response: HttpResponse<any>): void {
    // ignore
  }

  onError(error: HttpErrorResponse): void {
    try {
      this.toastrService.danger(error.error.message, error.error.title || error.error.error);
      if (error.status === 401) {
        this.authService.logout('email')
          .subscribe(() => {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigate(['/auth/login']);
          });
      }
    } catch (e) {
      this.toastrService.danger('An error occurred', '');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this.onSuccess(evt);
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.onError(err);
        }
        // return of(err);
        throw err;
      }));
  }

}
