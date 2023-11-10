import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {NbToastrService, NbWindowService} from '@nebular/theme';
import {UserService} from '../../../services/user-service';
import {ProviderActionComponent} from './provider-action.component';
import {RequestService} from '../../../services/request-service';
import {environment} from '../../../../environments/environment';
import {RequestDateComponent} from '../request-date.component';

@Component({
  selector: 'ngx-provider-dashboard',
  styleUrls: ['./provider-dashboard.component.scss'],
  templateUrl: './provider-dashboard.component.html',
})
export class ProviderDashboardComponent implements OnInit, OnDestroy {
  // noinspection JSUnusedGlobalSymbols
  settings = {
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
        renderComponent: ProviderActionComponent,
        onComponentInitFunction: this.onActionComponentInit.bind(this),
      },
    },
    actions: {
      edit: false,
      delete: false,
      add: false,
    },
  };

  source: ServerDataSource;
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
    this.source = this.requestService.getProviderRequestDatasource();
    this.source.setSort([{field: 'id', direction: 'desc'}]);
    this.reloadInterval = setInterval(() => {
      this.source.refresh();
    }, environment.reloadInterval);
  }

  onActionComponentInit(component: ProviderActionComponent): void {
    component.action.subscribe(event => {
      if (event.action === 'APPROVE') {
        this.requestService.approveRequest(event.rowData.id).subscribe(() => {
          this.source.refresh();
          this.toastrService.success('Request successfully approved.', 'Success');
        });
      }
    });
  }
}
