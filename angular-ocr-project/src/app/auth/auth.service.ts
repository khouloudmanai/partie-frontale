import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { singupModel, loginModel, forgotPasswordModel, AuthResData, User ,ChangePasswordModel,ChangeResData, NewPasswordModel, NewPasswordResData } from "./auth.model";
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    
    constructor(private http: HttpClient ,private router: Router){}

    

    signup(account: singupModel){
        return this.http.post<AuthResData>('http://localhost:8000/api/accounts/signup/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    login(account: loginModel){
        return this.http.post<AuthResData>('http://localhost:8000/api/accounts/login/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            this.handleAuth(res);
        }))
    }
    
    getUser(user_id:any): Observable<any> {

        return this.http.get<any>('http://localhost:8000/api/accounts/get-user/'+`${user_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }
    
    autologin(){
        const userData:AuthResData = JSON.parse(localStorage.getItem('user'))
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.user_id,userData.email,userData.username,userData.name,userData.token,userData.birthday)
        this.user.next(loadedUser)
        return;
    }

    forgotPassword(account: forgotPasswordModel){
        return this.http.post<AuthResData>('http://localhost:8000/api/accounts/request-reset-email/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    resetPasword(account: forgotPasswordModel){
        return this.http.post<AuthResData>('http://localhost:8000/api/accounts/password-reset/<uidb64>/<token>/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    changePassword(account: ChangePasswordModel){
        return this.http.put<ChangeResData>('http://localhost:8000/api/accounts/change-password/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    newPassword(account: NewPasswordModel){
        return this.http.patch<NewPasswordResData>('http://localhost:8000/api/accounts/password-reset-complete/',account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }


    editProfile(data: any,user_id: any){
        return this.http.patch<any>('http://localhost:8000/api/accounts/update-user/'+`${user_id}`,data)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    ArchiveNumber(user_id:string): Observable<any> {
        return this.http.get<any>('http://localhost:8000/documents/numberArchive/'+`${user_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }
    docsNumber(user_id:string): Observable<any> {
        return this.http.get<any>('http://localhost:8000/documents/numberDoc/'+`${user_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    private handleError(error: HttpErrorResponse){
        console.log(error)
        let errormessage = 'An unknown errror occured'
        if (error.error instanceof ErrorEvent) {

            // client-side error
 
            errormessage = error.error.message;
 
          }
        if(!error.error){
            return throwError(errormessage)
        }
        if(error.error.non_field_errors){
            errormessage = error.error.non_field_errors[0]
        }
        if(error.error.email){
            errormessage = error.error.email[0]
        }
        if(error.error.username){
            errormessage = error.error.username[0]
        }

        return throwError(errormessage);
    }

    private handleAuth(res: AuthResData){
        const user = new User(res.user_id,res.email,res.username,res.name,res.token,res.birthday,res.city,res.address,res.bio
            ,res.country,res.file,res.postalcode);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user))
    }

    logout(){
        this.user.next(null)
        localStorage.removeItem('user');
        this.router.navigate(['/auth'])
    }

}