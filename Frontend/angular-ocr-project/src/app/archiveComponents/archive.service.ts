import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../auth/auth.model";
import { HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ArchiveService{
    document = new BehaviorSubject<Document>(null);

    DJANGO_SERVER: string = "http://127.0.0.1:8000";

    constructor(private http: HttpClient ,private router: Router){}

    public newArchive(formData) {
        return this.http.post<any>(`${this.DJANGO_SERVER}/archive/create`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }));
      }



      public addDocs(formData) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/archive/addDocs`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }));
      }

      public deleteDocs(formData) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/archive/deleteDocs`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }));
      }

    
    listArchives(user_id:any): Observable<any> {

        return this.http.get<any>('http://localhost:8000/archive/'+`${user_id}`+'/')
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    detailArchive(archive_id:string): Observable<any> {
        return this.http.get<any>('http://localhost:8000/archive/detail/'+`${archive_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    getDocs(archive_id:any): Observable<any> {
        return this.http.get<any>('http://localhost:8000/archive/documents/'+`${archive_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    deleteArchive(id: any): Observable<any> {
        return this.http.delete(`${this.DJANGO_SERVER}/archive/delete/${id}`)
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

}