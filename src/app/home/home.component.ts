import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private matDialogConfig!: MatDialogConfig

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.matDialogConfig = new MatDialogConfig()
    this.matDialogConfig.width = '550px'

    if (localStorage.getItem('token')) {
      this.userService.checkToken().subscribe((res) => {
        this.router.navigate(['/cafe/dashboard'])
      }, (err) => {
        console.log(err);
      })
    }
  }

  onSignUp() {
    this.matDialog.open(SignupComponent, this.matDialogConfig)
  }

  onforgotPassword() {
    this.matDialog.open(ForgotPasswordComponent, this.matDialogConfig)
  }

  onLogin() {
    this.matDialog.open(LoginComponent, this.matDialogConfig)
  }

}
