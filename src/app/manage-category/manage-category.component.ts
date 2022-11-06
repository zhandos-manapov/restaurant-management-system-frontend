import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../services/category.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns = ['name', 'edit']
  dataSource: any
  matDialogConfig!: MatDialogConfig

  constructor(
    private categoryService: CategoryService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData()
    this.matDialogConfig = new MatDialogConfig()
    this.matDialogConfig.width = '550px'
  }

  tableData() {
    this.categoryService.get().subscribe((res) => {
      this.dataSource = res
    }, (err) => {
      const responseMessage = err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

  applyFilter(e: Event) {
    const filterValue = (<HTMLInputElement>e.target).value
    this.dataSource.filter = filterValue.trim().toLowerCase(
    )
  }

  onAdd() {
    this.matDialogConfig.data = { action: 'add' }
    this.handleSubmit()
  }

  onEdit(category: any) {
    this.matDialogConfig.data = { action: 'update', data: category }
    this.handleSubmit()
  }

  handleSubmit() {
    const dialogRef = this.matDialog.open(CategoryFormComponent, this.matDialogConfig)
    this.router.events.subscribe(() => dialogRef.close())
    const subscription = dialogRef.componentInstance.submitEvent.subscribe(() => this.tableData())
  }


}
