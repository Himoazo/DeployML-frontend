import { Injectable } from '@angular/core';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _snackBar = inject(MatSnackBar);
  
  alert(message: string) {
    this._snackBar.open(message, "X", {
      duration: 5000,
      panelClass: ['snackbarClass']
    });
  }
}
