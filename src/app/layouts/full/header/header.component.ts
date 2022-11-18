import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  matDialogConfig!: MatDialogConfig

  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.matDialogConfig = new MatDialogConfig()
  }

  logout() {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.data = { message: 'Sign Out ' }
    const matDialogRef = this.matDialog.open(ConfirmationComponent, matDialogConfig)
    const subscription = matDialogRef.componentInstance.statusChangeEvent.subscribe((user) => {
      matDialogRef.close()
      localStorage.clear()
      this.router.navigate(['/'])
    })
  }

  changePassword() {
    this.matDialog.open(ChangePasswordComponent, this.matDialogConfig)
  }



}
