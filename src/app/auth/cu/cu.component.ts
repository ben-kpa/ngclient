import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-cu',
  templateUrl: './cu.component.html',
  styleUrls: ['./cu.component.css']
})
export class CuComponent implements OnInit {

  private authSub!: Subscription;

  constructor(
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.authSub.subscribe();
    this.authService.autoLogin();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}