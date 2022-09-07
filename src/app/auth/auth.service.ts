import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {AuthModel} from "./auth.model";
import {Router} from "@angular/router";

interface AuthResponseData {
    key: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authSub = new Subject<AuthModel>();
    authStore = new AuthModel('','');
    isAuthenticated = false;

    constructor(
        private http: HttpClient,
    ) { }


    signUp(email:string, password1:string, password2:string){
        return this.http.post<AuthResponseData>(
            'https://website-backend-bj8a.herokuapp.com/api/dj-rest-auth/v1/registration/',
            {
                "username": email,
                "email": email,
                "password1": password1,
                "password2": password2
            }
        ).pipe(catchError(errorResp => {
            let errorArray = ['Something went wrong...'];
            if (!errorResp.error) {
                return throwError(()=>(errorArray))
            }
            if (errorResp.error.email) {
                errorArray.push(errorResp.error.email)
            }
            if (errorResp.error.password1) {
                errorArray.push(errorResp.error.password1)
            }
            if (errorResp.error.password2) {
                errorArray.push(errorResp.error.password2)
            }
            if (errorResp.error.non_field_errors) {
                errorArray.push(errorResp.error.non_field_errors)
            }
            return throwError(()=>(errorArray.join(' ').replace(",", " ")))
        }), tap(resData=>{
            this.handleAuthentication(email,resData.key);
        }));
    }



    signIn(email:string, password:string){
        return this.http.post<AuthResponseData>(
            'https://website-backend-bj8a.herokuapp.com/api/dj-rest-auth/v1/login/',
            {
                "username": email,
                "email": email,
                "password": password,
            }
        ).pipe(catchError(errorResp => {
            let errorArray = ['Something went wrong...'];
            if (!errorResp.error) {
                return throwError(()=>(errorArray))
            }
            if (errorResp.error.email) {
                errorArray.push(errorResp.error.email)
            }
            if (errorResp.error.password) {
                errorArray.push(errorResp.error.password)
            }
            if (errorResp.error.non_field_errors) {
                errorArray.push(errorResp.error.non_field_errors)
            }
            return throwError(()=>(errorArray.join(' ').replace(",", " ")))
        }), tap(resData=>{
            this.handleAuthentication(email,resData.key);
        }));
    }


    autoLogin() {
        const userData: { email: string, token: string } = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData.token) {
            return;
        }
        const loadedUser = new AuthModel(userData.email, userData.token)
        if (loadedUser.token) {
            this.isAuthenticated = true;
            this.authStore.token = userData.token
            this.authStore.email = userData.email
            this.authSub.next(loadedUser)
        }
    }

    logout(){
        this.authSub.next(null!);
        this.isAuthenticated = false;
        this.authStore = new AuthModel('','')
        localStorage.removeItem('userData');
    }


    private handleAuthentication(email: string, token:string) {
        this.authStore = new AuthModel(
            email,
            token);
        this.isAuthenticated = true;
        this.authSub.next(this.authStore)
        localStorage.setItem('userData', JSON.stringify(this.authStore));
    }




}