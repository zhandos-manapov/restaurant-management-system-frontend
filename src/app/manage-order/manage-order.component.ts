import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { IBill, ICategory } from 'src/app/shared/global-interface';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns = ['index', 'name', 'email', 'contactNumber', 'paymentMethod', 'createdBy', 'total', 'edit', 'print']
  dataSource!: MatTableDataSource<IBill>
  matDialogConfig!: MatDialogConfig

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.start()
    this.tableData()
    this.matDialogConfig = new MatDialogConfig()
    this.matDialogConfig.width = '1000px'
  }

  private tableData() {
    this.billService.getBills().subscribe((res) => {
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

  onEdit(bill: IBill) {
    this.matDialogConfig.data = { action: 'edit', data: bill }
    this.handleSubmit()
  }

  handleSubmit() {
    const dialogRef = this.matDialog.open(OrderFormComponent, this.matDialogConfig)
    this.router.events.subscribe(() => dialogRef.close())
    const subscription = dialogRef.componentInstance.submitEvent.subscribe(() => this.tableData())
  }

  onDelete(bill: IBill) {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.data = { message: `delete ${bill.name} bill` }
    const dialogRef = this.matDialog.open(ConfirmationComponent, matDialogConfig)
    const subscription = dialogRef.componentInstance.statusChangeEvent.subscribe(() => {
      this.deleteBill(bill.id)
      dialogRef.close()
    })
  }

  deleteBill(id: number) {
    this.billService.delete(id).subscribe((res) => {
      this.tableData()
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  printBill(bill: IBill) {
    this.ngxUiLoaderService.start()
    this.billService.getPdf(bill).subscribe((res) => {
      saveAs(res, bill.uuid + '.pdf')
      this.ngxUiLoaderService.stop()
    }, (err) => {
      this.ngxUiLoaderService.stop()
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }


}
