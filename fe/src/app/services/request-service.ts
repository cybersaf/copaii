import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RequestForm} from '../pages/dashboard/request/request';
import {environment} from '../../environments/environment';
import {CustomServerDataSource} from '../@core/custom-server-data-source';

@Injectable({providedIn: 'root'})
export class RequestService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl + 'api';
  }

  getProvidersList(): Observable<any> {
    return this.http.get(this.baseUrl + '/users/providers');
  }

  createNewRequest(requestForm: RequestForm) {
    return this.http.post(this.baseUrl + '/patient/requests', requestForm);
  }

  getDonorApprovedRequestDatasource() {
    return new CustomServerDataSource(this.http, this.baseUrl + '/donor/requests/approved');
  }

  getDonorFundedRequestDatasource() {
    return new CustomServerDataSource(this.http, this.baseUrl + '/donor/requests/funded');
  }

  fundRequest(requestId: number) {
    return this.http.post(this.baseUrl + '/donor/requests/' + requestId + '/pay', null);
  }

  getPatientsRequestDataSource() {
    return new CustomServerDataSource(this.http, this.baseUrl + '/patient/requests');
  }

  cancelRequest(requestId: number) {
    return this.http.post(this.baseUrl + '/patient/requests/' + requestId + '/cancel', null);
  }

  getProviderRequestDatasource() {
    return new CustomServerDataSource(this.http, this.baseUrl + '/provider/requests');
  }

  approveRequest(requestId: number) {
    return this.http.post(this.baseUrl + '/provider/requests/' + requestId + '/approve', null);
  }
}
