/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpResponse} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {AuthGuard} from './auth-guard.service';
import {AuthInterceptor} from './auth-interceptor.service';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {RoleProvider} from './role-provider.service';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.apiUrl + 'api/auth/',
          login: {
            endpoint: 'login',
            requireValidToken: false,
          },
          register: {
            requireValidToken: false,
            redirect: {
              success: 'auth/login',
            },
          },
          requestPass: false,
          token: {
            getter: (module: string, res: HttpResponse<Object>) => {
              return res.body;
            },
          },
        }),
      ],
      forms: {},
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        PATIENT: {
          view: ['patient-dashboard', 'user'],
        },
        PROVIDER: {
          view: ['provider-dashboard', 'user'],
        },
        DONOR: {
          view: ['donor-dashboard', 'user'],
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: NbRoleProvider,
      useClass: RoleProvider,
    },
  ],
})
export class AppModule {
}
