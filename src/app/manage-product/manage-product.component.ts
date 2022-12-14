import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ProductService } from '../services/product.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { IProduct } from '../shared/global-interface';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns = ['name', 'categoryName', 'description', 'price', 'edit']
  dataSource: any
  matDialogConfig!: MatDialogConfig

  constructor(
    private productService: ProductService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.start()
    this.tableData()
    this.matDialogConfig = new MatDialogConfig()
    this.matDialogConfig.width = '550px'
  }

  private tableData() {
    this.productService.get().subscribe((res) => {
      this.ngxUiLoaderService.stop()
      this.dataSource = new MatTableDataSource(res)
    }, (err) => {
      this.ngxUiLoaderService.stop()
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  applyFilter(e: Event) {
    const filterValue = (<HTMLInputElement>e.target).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onAdd() {
    this.matDialogConfig.data = { action: 'add' }
    this.handleSubmit()
  }

  onEdit(product: any) {
    this.matDialogConfig.data = { action: 'update', data: product }
    this.handleSubmit()
  }

  handleSubmit() {
    const dialogRef = this.matDialog.open(ProductFormComponent, this.matDialogConfig)
    this.router.events.subscribe(() => dialogRef.close())
    const subscription = dialogRef.componentInstance.submitEvent.subscribe(() => this.tableData())
  }

  onDelete(product: IProduct) {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.data = { message: `delete ${product.name} product` }
    const dialogRef = this.matDialog.open(ConfirmationComponent, matDialogConfig)
    const subscription = dialogRef.componentInstance.statusChangeEvent.subscribe(() => {
      this.deleteProduct(product.id)
      dialogRef.close()
    })
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe((res) => {
      this.tableData()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  onChange(status: boolean, id: number) {
    const data = { id, status: status.toString() }
    this.productService.updateStatus(data).subscribe((res) => {
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

}
