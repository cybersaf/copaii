import {Component, OnInit} from '@angular/core';
import {NbAccessChecker} from '@nebular/security';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(public accessChecker: NbAccessChecker) {
  }

  ngOnInit(): void {
  }

}
