import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) {
  }

  showDefaultToaster(msg: string, duration?: number, action?: any) {
    this.snackBar.open(msg, action, {
      duration: duration ? duration : 5000,
      horizontalPosition: 'left',
    });
  }

  showSuccessToaster(msg: string, duration?: number) {
    this.snackBar.open(msg, null, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'left',
      panelClass: ['success-snackbar']
    });
  }

  showWarningToaster(msg: string, duration?: number) {
    this.snackBar.open(msg, null, {
      duration: duration ? duration : 5000,
      horizontalPosition: 'left',
      panelClass: ['warning-snackbar']
    });
  }

  showErrorToaster(msg: string, duration?: number) {
    this.snackBar.open(msg, null, {
      duration: duration ? duration : 5000,
      horizontalPosition: 'left',
      panelClass: ['error-snackbar']
    });
  }
}
