import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDateService, NbToastrService, NbWindowRef} from '@nebular/theme';
import {RequestForm} from './request';
import {RequestService} from '../../../services/request-service';

@Component({
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestFormComponent implements OnInit {
  form: RequestForm;
  providers = [{id: 0, name: 'test'}];
  onAdded: any;


  constructor(public windowRef: NbWindowRef,
              public requestService: RequestService,
              private dateService: NbDateService<Date>,
              private toastrService: NbToastrService) {
    this.form = new RequestForm();
  }

  ngOnInit(): void {
    this.requestService.getProvidersList().subscribe(res => {
      this.providers = res;
    });
  }

  close() {
    this.windowRef.close();
  }


  submitEventForm(): any {
    this.requestService.createNewRequest(RequestFormComponent.mapRequest(this.form)).subscribe(() => {
      this.onAdded();
      this.toastrService.success('New request created.', 'Success');
      this.close();
    });
  }

  private static mapRequest(form: RequestForm): RequestForm {
    return form.clone();
  }
}
