import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    let panelClass = action === 'error' ? 'red-snackbar' : 'green-snackbar'
    this.matSnackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass,
    })
  }
  
}
