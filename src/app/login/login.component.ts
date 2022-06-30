import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginModel } from '../Models/LoginModel';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetail!: FormGroup;
  loginDetails: LoginModel={
    id: 0,
    uid: "",
    username: "",
    password: ""
  };

  formErrors = {
    username: "",
    password: ""
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'invalid' : 'Invalid Username'
    },
    'password': {
      'required': 'Password is required',
      'invalid':'Wrong Password'
    }
  }

  constructor(private fb: FormBuilder, private _loginService:LoginService,private _router:Router) {
    if(localStorage.getItem('uid')!=null)
    {
      _router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
    this.loginDetail = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginDetail.get('password')?.valueChanges.subscribe((value : string) => {
      this.loginDetails.password=value;
    })

    this.loginDetail.get('username')?.valueChanges.subscribe((value : string) => {
      this.loginDetails.username=value;
    })
  }

  logValidationErrors(group: FormGroup = this.loginDetail): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractFormControl = group.get(key);

      (this.formErrors as any)[key] = '';
      if ((abstractFormControl && !abstractFormControl.valid) && (abstractFormControl.touched || abstractFormControl.dirty)) {
        const messages = (this.validationMessages as any)[key];
        console.log(abstractFormControl.errors);
        for (const errorkey in abstractFormControl.errors) {
          if (errorkey) {
            (this.formErrors as any)[key] += messages[errorkey] + ' ';
          }
        }
      }

      if (abstractFormControl instanceof FormGroup) {
        this.logValidationErrors(abstractFormControl);
      }
      if (abstractFormControl instanceof FormArray) {
        for( const control of abstractFormControl.controls){
          if(control instanceof FormGroup){
            this.logValidationErrors(control)
          }
        }

      }

    });
  }

  saveUser(){
    console.log(this.loginDetails);
    this._loginService.loginUser(this.loginDetails).pipe(catchError(this.handleError.bind(this))).subscribe(
      (data)=>this.success(data)
    );
  }

  private success(data:LoginModel)
  {
    localStorage.setItem('uid',data.uid);
    localStorage.setItem('username',data.username);
    this._router.navigate(['/home']);
  }

  handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.status==404)
    {
      this.formErrors.username='Invalid Username';
      console.log('Invalid Username');
    }
    if(errorResponse.status==401){
      this.formErrors.password='Invalid Password';
      console.log('Invalid Password');
    }

    return throwError(() => new Error('there is a problem with the service.'));
  }
  
}
