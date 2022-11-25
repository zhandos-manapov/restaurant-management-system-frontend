import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ICategory, IResponse } from 'src/app/shared/global-interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  submitEvent = new EventEmitter()
  productForm!: FormGroup
  dialogAction = 'add'
  categories: ICategory[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public matDialogRef: MatDialogRef<ProductFormComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
    this.dialogAction = this.dialogData.action
    if (this.dialogAction === 'update') this.productForm.patchValue(this.dialogData.data)
    this.getCategories()
  }

  private getCategories() {
    this.categoryService.get().subscribe((res) => {
      this.categories = res
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  onSubmit() {
    let
      formData = { ...this.productForm.value },
      obs: Observable<IResponse>
    if (this.dialogAction === 'update') {
      formData.id = this.dialogData.data.id
      obs = this.productService.update(formData)
    } else {
      obs = this.productService.add(formData)
    }
    obs.subscribe((res) => {
      this.matDialogRef.close()
      this.submitEvent.emit()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      this.matDialogRef.close()
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })


  }


}
