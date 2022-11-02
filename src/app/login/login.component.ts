import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { ILoginResponse, IResponse } from '../shared/global-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<LoginComponent>,
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit() {
    this.ngxUiLoaderService.start()
    const data = { ...this.loginForm.value }
    this.userService.login(data).subscribe((res: ILoginResponse) => {
      this.ngxUiLoaderService.stop()
      this.matDialogRef.close()
      localStorage.setItem('token', res.token)
      this.router.navigate(['/cafe/dashboard'])
    }, (err) => {
      this.ngxUiLoaderService.stop()
      const responseMessage = err.error.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }


}
