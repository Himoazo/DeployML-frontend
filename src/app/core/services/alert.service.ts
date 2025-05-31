import { Injectable } from '@angular/core';
import {Component, inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
