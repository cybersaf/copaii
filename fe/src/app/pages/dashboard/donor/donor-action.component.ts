import {Component, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {Subject} from 'rxjs';

@Component({
  template: `
    <button nbButton outline status="danger" size="tiny" class="m-1 w-100"
            *ngIf="rowData.status === 'APPROVED'"
            (click)="onClick('PAY')">Pay
    </button>
  `,
  selector: 'ngx-donor-action-component',
})
export class DonorActionComponent implements ViewCell, OnInit {

  rowData: any;
  value: string | number;
  text: string;
  hidden = true;

  public action = new Subject<any>();

  ngOnInit() {
  }

  onClick(action: string) {
    this.action.next({action: action, rowData: this.rowData});
  }
}
