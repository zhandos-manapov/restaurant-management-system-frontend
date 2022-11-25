import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private matDialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxUiLoaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  validateSubmit() {
    const formValue = this.changePasswordForm.value
    return formValue.newPassword != formValue.confirmPassword
  }

  onSubmit() {
    this.ngxUiLoaderService.start()
    const formData = { ...this.changePasswordForm.value }
    this.userService.changePassword(formData).subscribe((res) => {
      this.ngxUiLoaderService.stop()
      this.matDialogRef.close()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      this.ngxUiLoaderService.stop()
      const responseMessage = err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

}
