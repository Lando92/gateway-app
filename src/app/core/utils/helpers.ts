import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ParamMap} from '@angular/router';

export const test = 'Hello World';
// Page Size for Pagination
export const SHORT_PAGE_SIZES = [
  10,
  20,
  30,
  50
];

// Generates a Connection Issue Error.
export const connectionIssueResponse = {
  body: {
    errorCode: 503,
    message: 'Service Unavailable'
  },
  json() {
    return {
      errorCode: this.body.errorCode,
      message: this.body.message,
    };
  }
};

// Handler for errors
export function errorHandle(serverResponse: any): Observable<any> {

  let body = connectionIssueResponse.body;

  const response = (serverResponse instanceof Array && serverResponse.length > 0) ? serverResponse[0] : serverResponse;

  if (response instanceof Response) {
    const err: any = response.json() || '';
    body = err.error ? err.error : connectionIssueResponse.body;
  } else if (response instanceof HttpErrorResponse) {
    if (response.error && !response.error.message) {
      response.error.message = 'An error has occurred';
    }
    if (response.error && !response.error.errorCode) {
      response.error.errorCode = 503;
    }
    body = response.error ? response.error : connectionIssueResponse.body;
  }

  return throwError(body);
}

export function getQueryParams(params: ParamMap, omit: string[]): any {
  return params.keys.reduce((curr, key) => {
    if (omit && omit.length && omit.find(k => k === key)) {
      return curr;
    }
    const param = params.getAll(key);
    if (param) {
      curr[key] = param.length === 1 ? param[0] : param;
    }
    return curr;
  }, {});
}
