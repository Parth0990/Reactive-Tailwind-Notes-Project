import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { LoginModel } from "../Models/LoginModel";
@Injectable()
export class SignUpService {
    baseUrl = 'https://localhost:44352/api/signup';
    constructor(private _httpClient: HttpClient) {}
    
    addUser(data:LoginModel)
    {
        console.log("reached signup service");
        return this._httpClient.post<LoginModel>(this.baseUrl,data , {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          });
    }
}