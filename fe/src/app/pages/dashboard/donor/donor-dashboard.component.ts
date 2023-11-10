import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {NbToastrService, NbWindowService} from '@nebular/theme';
import {UserService} from '../../../services/user-service';
import {DonorActionComponent} from './donor-action.component';
import {RequestService} from '../../../services/request-service';
import {environment} from '../../../../environments/environment';
import {RequestDateComponent} from '../request-date.component';

@Component({
  selector: 'ngx-donor-dashboard',
  styleUrls: ['./donor-dashboard.component.scss'],
  templateUrl: './donor-dashboard.component.html',
})
export class DonorDashboardComponent implements OnInit, OnDestroy {
  // noinspection JSUnusedGlobalSymbols
  approvedSettings = {
    columns: {
      requestDate: {
        title: 'Request Date',
        type: 'custom',
        filter: false,
        class: 'text-nowrap',
        renderComponent: RequestDateComponent,
      },
      'provider.firstName': {
        title: 'Provider',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => row.provider.firstName,
      },
      'patient.firstName': {
        title: 'Patient',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => row.patient.firstName + ' ' + row.patient.lastName,
      },
      amount: {
        title: 'Amount',
        type: 'string',
        filter: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      view: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        sort: false,
        width: '210px',
        renderComponent: DonorActionComponent,
        onComponentInitFunction: this.onActionComponentInit.bind(this),
      },
    },
    actions: {
      edit: false,
      delete: false,
      add: false,
    },
  };

  // noinspection JSUnusedGlobalSymbols
  fundedSettings = {
    columns: {
      requestDate: {
        title: 'Request Date',
        type: 'custom',
        filter: false,
        class: 'text-nowrap',
        renderComponent: RequestDateComponent,
      },
      'provider.firstName': {
        title: 'Provider',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => row.provider.firstName,
      },
      'patient.firstName': {
        title: 'Patient',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => row.patient.firstName + ' ' + row.patient.lastName,
      },
      amount: {
        title: 'Amount Funded',
        type: 'string',
        filter: false,
      },
    },
    actions: {
      edit: false,
      delete: false,
      add: false,
    },
  };

  approvedSource: ServerDataSource;
  fundedSource: ServerDataSource;
  private reloadInterval;

  constructor(private userService: UserService,
              private requestService: RequestService,
              private windowService: NbWindowService,
              private toastrService: NbToastrService) {
  }

  ngOnDestroy(): void {
    clearInterval(this.reloadInterval);
  }

  ngOnInit(): void {
    this.approvedSource = this.requestService.getDonorApprovedRequestDatasource();
    this.approvedSource.setSort([{field: 'id', direction: 'desc'}]);
    this.fundedSource = this.requestService.getDonorFundedRequestDatasource();
    this.fundedSource.setSort([{field: 'id', direction: 'desc'}]);
    this.reloadInterval = setInterval(() => {
      this.approvedSource.refresh();
      this.fundedSource.refresh();
    }, environment.reloadInterval);
  }

  onActionComponentInit(component: DonorActionComponent): void {
    component.action.subscribe(event => {
      if (event.action === 'PAY') {
        this.requestService.fundRequest(event.rowData.id).subscribe(() => {
          this.approvedSource.refresh();
          this.fundedSource.refresh();
          this.toastrService.success('Request successfully paid.', 'Success');
        });
      }
    });
  }

}
