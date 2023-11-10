import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbTabsetModule, NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {PatientActionComponent} from './patient/patient-action.component';
import {RequestFormComponent} from './request/request-form.component';
import {PatientDashboardComponent} from './patient/patient-dashboard.component';
import {NbSecurityModule} from '@nebular/security';
import {ProviderDashboardComponent} from './provider/provider-dashboard.component';
import {DonorDashboardComponent} from './donor/donor-dashboard.component';
import {ProviderActionComponent} from './provider/provider-action.component';
import {DonorActionComponent} from './donor/donor-action.component';
import {RequestDateComponent} from './request-date.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbSecurityModule,
    NbTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    PatientDashboardComponent,
    ProviderDashboardComponent,
    DonorDashboardComponent,
    PatientActionComponent,
    ProviderActionComponent,
    DonorActionComponent,
    RequestFormComponent,
    RequestDateComponent,
  ],
})
export class DashboardModule {
}
