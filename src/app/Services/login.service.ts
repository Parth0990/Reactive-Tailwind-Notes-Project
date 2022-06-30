import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { LoginModel } from "../Models/LoginModel";
@Injectable()
export class LoginService {
    baseUrl = 'https://localhost:44352/api/user';
    constructor(private _httpClient: HttpClient) {}

    // private handleError(errorResponse: HttpErrorResponse) {
    //     // if (errorResponse.error instanceof ErrorEvent) {
    //     //   console.error('Client Side Error ', errorResponse.error.message);
    //     // } else {
    //     //   console.error('Server Side error: ', errorResponse.status);
    //     // }
    
    //     return throwError(() => new Error('there is a problem with the service.'));
    //   }

    loginUser(data:LoginModel)
    {
        console.log("reached service");
        return this._httpClient.post<LoginModel>(this.baseUrl,data , {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          });
    }

    lastUserId(){
      return this._httpClient.get<string>(this.baseUrl);
    }
}