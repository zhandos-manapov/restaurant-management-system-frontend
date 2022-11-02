import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
import { IToken } from '../shared/global-interface';
import { GlobalConstants } from '../shared/global-constants';



@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoleArray = route.data['expectedRole']

    const token = localStorage.getItem('token')
    let tokenPayload!: IToken
    try {
      tokenPayload = jwt_decode(token!)
    } catch (err) {
      localStorage.clear()
      this.router.navigate(['/'])
    }

    let checkRole = false
    for (const role of expectedRoleArray as []) {
      if (role == tokenPayload.role)
        checkRole = true
    }

    if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
      if (this.authService.isAuthenticated() && checkRole)
        return true
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error)
      this.router.navigate(['/cafe/dashboard'])
      return false
    } else {
      this.router.navigate(['/'])
      localStorage.clear()
      return false
    }
  }
}
