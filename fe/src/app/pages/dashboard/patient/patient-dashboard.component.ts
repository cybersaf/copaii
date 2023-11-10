import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {NbToastrService, NbWindowService} from '@nebular/theme';
import {UserService} from '../../../services/user-service';
import {PatientActionComponent} from './patient-action.component';
import {RequestFormComponent} from '../request/request-form.component';
import {RequestService} from '../../../services/request-service';
import {environment} from '../../../../environments/environment';
import {RequestDateComponent} from '../request-date.component';

@Component({
  selector: 'ngx-patient-dashboard',
  styleUrls: ['./patient-dashboard.component.scss'],
  templateUrl: './patient-dashboard.component.html',
})
export class PatientDashboardComponent implements OnInit, OnDestroy {
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
        renderComponent: PatientActionComponent,
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
    this.source = this.requestService.getPatientsRequestDataSource();
    this.source.setSort([{field: 'id', direction: 'desc'}]);
    this.reloadInterval = setInterval(() => {
      this.source.refresh();
    }, environment.reloadInterval);
  }

  onActionComponentInit(component: PatientActionComponent): void {
    component.action.subscribe(event => {
      if (event.action === 'CANCEL') {
        this.requestService.cancelRequest(event.rowData.id).subscribe(() => {
          this.source.refresh();
          this.toastrService.success('Request successfully cancelled.', 'Success');
        });
      }
    });
  }

  openRequestPopup() {
    this.windowService.open(
      RequestFormComponent,
      {
        title: 'New Request',
        context: {
          onAdded: this.onEventCreated.bind(this),
        },
      },
    );
  }

  onEventCreated(): void {
    this.source.refresh();
  }
}
