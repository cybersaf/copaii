import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {NbAuthService} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {map} from 'rxjs/operators';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.getToken()
      .pipe(
        map((authToken: any) => {
          return authToken.token.role;
        }),
      );
  }
}
