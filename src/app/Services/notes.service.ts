import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { NotesModel } from "../Models/notesModel";

@Injectable()
export class NotesService {
    baseUrl = '';
    constructor(private _httpClient: HttpClient) {}

    save(notes: NotesModel) : Observable<NotesModel> | null{
        if (notes.id === 0) {
          return this._httpClient.post<NotesModel>(`${this.baseUrl}`, notes , {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).pipe(catchError(this.handleError));
          // this.listEmployees.push(employee);
          // console.log(employee);
        } 
        // return null;
        else {
          // const foundIndex = this.listEmployees.findIndex(
          //   (e) => e.id === employee.id
          // );
          // this.listEmployees[foundIndex] = employee;
          return this._httpClient.put<NotesModel>(`${this.baseUrl}`+notes.id,notes,{
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).pipe(catchError(this.handleError));
        }
      }

    getNotes(id: number): Observable<NotesModel> {
        //return this.listEmployees.find(e => e.id === id);
        return this._httpClient
          .get<NotesModel>(`${this.baseUrl}` + id)
          .pipe(catchError(this.handleError));
      }
      private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
          console.error('Client Side Error ', errorResponse.error.message);
        } else {
          console.error('Server Side error: ', errorResponse);
        }
    
        return throwError(() => new Error('there is a problem with the service.'));
      }
}