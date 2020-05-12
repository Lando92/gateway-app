import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {errorHandle} from '../utils/helpers';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Gateway} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  api = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) {
  }

  getGateways(): Observable<Gateway[]> {
    return this.httpClient.get<any>(`${this.api}gateway`).pipe(
      map(r => r),
      catchError(errorHandle),
    );
  }

  getGateway(id: string): Observable<Gateway> {
    return this.httpClient.get<any>(`${this.api}gateway/${id}`).pipe(
      map(r => r),
      catchError(errorHandle),
    );
  }

  deleteGateway(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}gateway/${id}`).pipe(
      map(r => r),
      catchError(errorHandle),
    );
  }

  addGateway(gateway: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}gateway`, gateway).pipe(
      map(r => r),
      catchError(errorHandle),
    );
  }

  editGateway(id: string, patch: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.api}gateway/${id}`, patch).pipe(
      map(r => r),
      catchError(errorHandle),
    );
  }
}
