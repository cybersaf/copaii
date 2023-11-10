import {Component, ViewEncapsulation} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {RequestForm} from './request/request';

@Component({
  template: `
    <span [nbTooltip]="'Request ID: [' +  rowData.requestId + ']'" [textContent]="value"></span>
  `,
  selector: 'ngx-request-date-component',
  styles: ['nb-tooltip {max-width: 100% !important;}'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestDateComponent implements ViewCell {
  rowData: RequestForm;
  value: string | number;
}
