import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { IDashboardDetails } from '../shared/global-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: IDashboardDetails | null = null

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    // this.ngxUiLoaderService.start()
    this.dashboardData()
  }

  private dashboardData() {
    this.dashboardService.getDetails().subscribe((res: IDashboardDetails) => {
      // this.ngxUiLoaderService.stop()
      this.data = res
    }, (err) => {
      // this.ngxUiLoaderService.stop()
      const responseMessage = err.error?.message ?? GlobalConstants.genericError
      this.snackbarService.openSnackBar(responseMessage, GlobalConstants.error)
    })
  }

}
