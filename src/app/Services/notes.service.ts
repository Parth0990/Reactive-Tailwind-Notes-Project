import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { NotesModel } from "../Models/notesModel";

@Injectable()
export class NotesService {
    baseUrl = 'https://localhost:44352/api/notes';
    constructor(private _httpClient: HttpClient) {}

    save(notes: NotesModel) : Observable<NotesModel> | null{
        if (notes.id === 0) {
          notes.noteid="n"+Math.floor(Math.random()*100000+1);
          notes.uid=localStorage.getItem('uid')||"";
          return this._httpClient.post<NotesModel>(`${this.baseUrl}`, notes , {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).pipe(catchError(this.handleError));
        } 
        else {
          return this._httpClient.put<NotesModel>(`${this.baseUrl}`+"?noteid="+notes.noteid,notes,{
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).pipe(catchError(this.handleError));
        }
      }

      getNotes(uid: string): Observable<NotesModel[]> {
        //return this.listEmployees.find(e => e.id === id);
        return this._httpClient
          .get<NotesModel[]>(`${this.baseUrl}`+"?uid="+uid);
      }

      deleteNotes(noteid: string) {
        return this._httpClient.delete(`${this.baseUrl}`+"?noteid="+noteid,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
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