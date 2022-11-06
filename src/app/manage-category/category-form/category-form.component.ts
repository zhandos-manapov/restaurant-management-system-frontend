import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { IResponse } from 'src/app/shared/global-interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  submitEvent = new EventEmitter()
  categoryForm!: FormGroup
  dialogAction = 'add'


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public matDialogRef: MatDialogRef<CategoryFormComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]]
    })
    this.dialogAction = this.dialogData.action
    this.categoryForm.patchValue(this.dialogData.data)
  }

  onSubmit() {
    let
      formData = { ...this.categoryForm.value },
      obs: Observable<IResponse>
    if (this.dialogAction === 'update') {
      formData.id = this.dialogData.data.id
      obs = this.categoryService.update(formData)
    } else {
      obs = this.categoryService.add(formData)
    }
    obs.subscribe((res) => {
      this.matDialogRef.close()
      this.submitEvent.emit()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      this.matDialogRef.close()
      const responseMessage = err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

}
