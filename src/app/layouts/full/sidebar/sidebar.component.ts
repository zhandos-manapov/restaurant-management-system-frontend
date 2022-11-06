import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import jwt_decode from 'jwt-decode';
import { IMenu, IToken } from 'src/app/shared/global-interface';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  tokenPayload!: IToken
  menuItems!: IMenu[]

  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.menuItems = GlobalConstants.MENUITEMS
  }
  
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.tokenPayload = jwt_decode(token!)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


