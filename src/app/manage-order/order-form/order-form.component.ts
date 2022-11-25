import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ignoreElements } from 'rxjs';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ICategory, IProduct } from 'src/app/shared/global-interface';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  submitEvent = new EventEmitter()

  displayedColumns = ['name', 'category', 'price', 'quantity', 'total', 'edit']
  orderForm!: FormGroup
  dialogAction = 'add'
  categories: ICategory[] = []
  products: IProduct[] = []
  price!: number
  billTotal: number = 0
  billData: any
  dataSource!: MatTableDataSource<any>

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private billService: BillService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public matDialogRef: MatDialogRef<OrderFormComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      quantity: [0, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]]
    })
    this.dialogAction = this.dialogData.action
    if (this.dialogAction === 'edit') {
      this.orderForm.patchValue({ ...this.dialogData.data, total: 0 })
      this.billTotal = this.dialogData.data.total
      this.billData = this.dialogData.data
    }
    this.getCategories()

    let productDetails = JSON.parse(this.dialogData.data.productDetails)
    this.dataSource = new MatTableDataSource(productDetails)
  }

  private getCategories() {
    this.categoryService.get().subscribe(
      (res) => {
        this.categories = res
      },
      (err) => {
        const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
        this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
      }
    )
  }

  getProductsByCategory(category: ICategory) {
    this.productService.getByCategoryId(category.id).subscribe(
      (res) => {
        this.products = res
        this.orderForm.patchValue({
          price: '',
          quantity: '',
          total: 0,
        })
      },
      (err) => {
        const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
        this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
      }
    )
  }

  getProductDetails(product: IProduct) {
    this.productService.getById(product.id).subscribe((res) => {
      this.price = res.price
      this.orderForm.patchValue({
        price: res.price,
        quantity: 1,
        total: res.price
      })
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  setQuantity(quantity: Event) {
    let temp = this.orderForm.value['quantity']
    if (temp > 0) {
      let change = this.orderForm.value['quantity'] * this.orderForm.value['price']
      this.orderForm.patchValue({
        total: change,
      })
    }
  }

  validateAddProduct() {
    if (this.orderForm.value['total'] == 0 ||
      this.orderForm.value['total'] == null ||
      this.orderForm.value['quantity'] == 0)
      return true
    return false
  }

  validateSubmit() {
    if (this.billTotal === 0 ||
      this.orderForm.value['name'] === null ||
      this.orderForm.value['email'] === null ||
      this.orderForm.value['contactNumber'] === null ||
      this.orderForm.value['paymentMethod'] === null ||
      !(this.orderForm.controls['contactNumber'].valid) ||
      !(this.orderForm.controls['email'].valid))
      return true
    return false
  }

  onAdd() {
    let formData = { ...this.orderForm.value }
    let productIndex = this.dataSource.data.findIndex((e: { id: number }) => e.id == formData.product.id)
    this.billTotal = this.billTotal + formData.total
    let dataSource = [...this.dataSource.data]

    if (productIndex === -1) {
      let newEntry = {
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      }
      dataSource.push(newEntry)
    } else {
      dataSource[productIndex]['quantity'] += formData['quantity']
      dataSource[productIndex]['total'] += formData['total']
    }
    this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'success')
    this.dataSource = new MatTableDataSource(dataSource)
  }

  onDelete(index: number, element: any) {
    this.billTotal -= element.total
    this.dataSource.data.splice(index, 1)
    this.dataSource = new MatTableDataSource(this.dataSource.data)
  }

  onSubmit() {
    let formData = { ...this.orderForm.value }
    let data = {
      id: this.billData.id,
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      total: this.billTotal,
      productDetails: JSON.stringify(this.dataSource.data)
    }
    this.billService.update(data).subscribe((res) => {
      this.submitEvent.emit()
      this.matDialogRef.close()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }



}
