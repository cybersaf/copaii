import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './services/user-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      return this.userService.getMyProfile().toPromise().then(() => {
        return resolve(true);
      }).catch(() => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['auth/login']);
        return resolve(false);
      });
    });
  }
}
