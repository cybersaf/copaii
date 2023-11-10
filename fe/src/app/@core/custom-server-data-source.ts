import {HttpClient, HttpParams} from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';

export class CustomServerDataSource extends ServerDataSource {
  constructor(http: HttpClient, endPoint: string) {
    super(http, {
      endPoint: endPoint,
      sortDirKey: 'sort',
      sortFieldKey: 'sort',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      // filterFieldKey: '',
      totalKey: 'totalElements',
      dataKey: 'content',
    });
  }

  protected addSortRequestParams(httpParams: HttpParams): HttpParams {
    if (this.conf.sortFieldKey === this.conf.sortDirKey) {
      const sort = this.sortConf[0];
      if (sort) {
        httpParams = httpParams.set(this.conf.sortFieldKey, sort.field + ',' + sort.direction);
      }
      return httpParams;
    } else {
      return super.addSortRequestParams(httpParams);
    }
  }

  protected addFilterRequestParams(httpParams: HttpParams): HttpParams {
    if (this.filterConf.filters.length) {
      this.filterConf.filters.forEach(item => {
        httpParams = httpParams.set(item.field, item.search);
      });
    }
    return httpParams;
  }

}
