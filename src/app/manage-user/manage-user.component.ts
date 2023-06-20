import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { IUser } from '../shared/global-interface';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  displayedColumns = ['index', 'name', 'email', 'contact_number', 'status']
  dataSource!: MatTableDataSource<IUser>

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.start()
    this.tableData()
  }

  private tableData() {
    this.userService.getUsers().subscribe((res) => {
      console.log(res);
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

  onChange(status: boolean, id: number) {
    let data = { id, status: status.toString() }
    this.userService.update(data).subscribe((res) => {
      const responseMessage = res.message
      this.snackbarService.openSnackBar(responseMessage, 'success')
    }, (err) => {
      const responseMessage = err.message ?? err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

}
