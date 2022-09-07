import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-rg',
  templateUrl: './rg.component.html',
  styleUrls: ['./rg.component.css']
})
export class RgComponent implements OnInit {

  resError: string = '';
  isLoading = false;

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSubmitRegister(form: NgForm){

    if (!form.valid){return;}

    const email = form.value.email;
    const password = form.value.password;
    const passwordConfirm = form.value.passwordConfirm;

    this.isLoading = true;

    this.authService.signUp(email,password,passwordConfirm).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    });
    form.reset();
  }

  handleUpdateResponse(resData:any){
    console.log(resData)
    this.router.navigate(['/'])
    this.isLoading = false;
  }

  handleError(error:any){
    this.resError = error
    console.log(error)
    this.isLoading = false;
  }


}
