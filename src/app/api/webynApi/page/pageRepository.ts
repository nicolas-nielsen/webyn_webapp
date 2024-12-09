import { inject, Injectable } from '@angular/core';
import { Page } from 'types/page/page.type';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class PageRepository {
  private readonly basePath: string = environment.webynApiPath;
  private readonly httpClient = inject(HttpClient)

  getTraffic(): Observable<Array<Page>> {
    return this.httpClient.get<Array<Page>>(`${this.basePath}/api/traffic`).pipe(tap(data => {
      console.log(data);
    }));
  }
}
