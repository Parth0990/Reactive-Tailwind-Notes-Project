import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginModel } from '../Models/LoginModel';
import { SignUpService } from '../Services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupDetail!: FormGroup;
  signupDetails: LoginModel = {
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
      'required': 'Email is required.',
      'pattern':'Email is invalid'
    },
    'password': {
      'required': 'Password is required'
    }
  }
  constructor(private fb: FormBuilder,private _router:Router,private _signupService:SignUpService) {
    if(localStorage.getItem('uid')!=null)
    {
      localStorage.clear();
      _router.navigate(['/login']);
    }
   }

   

  ngOnInit(): void {
    this.signupDetail = this.fb.group({
      username: ['',[ Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      password: ['', Validators.required]
    })

    this.signupDetail.valueChanges.subscribe((data)=>{
      this.signupDetails.username=this.signupDetail.get('username')?.value
      this.signupDetails.password=this.signupDetail.get('password')?.value
    })
  }

  logValidationErrors(group: FormGroup = this.signupDetail): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractFormControl = group.get(key);

      (this.formErrors as any)[key] = '';
      if ((abstractFormControl && !abstractFormControl.valid) && (abstractFormControl.touched || abstractFormControl.dirty)) {
        const messages = (this.validationMessages as any)[key];
       // console.log(abstractFormControl.errors);
        // console.log(abstractFormControl.errors);
        for (const errorkey in abstractFormControl.errors) {
          if (errorkey) {
            (this.formErrors as any)[key] += messages[errorkey] + ' ';
          }
        }
      }

      if (abstractFormControl instanceof FormGroup) {
        this.logValidationErrors(abstractFormControl);
        // abstractFormControl?.disable();
      }
      if (abstractFormControl instanceof FormArray) {
        for (const control of abstractFormControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control)
          }
        }
        // this.logValidationErrors(abstractFormControl);
        // abstractFormControl?.disable();
      }
      // else {

      // abstractFormControl?.markAsDirty();
      // console.log('Key = ' + key + ' Value = ' + abstractFormControl?.value);
      // }
    });
  }

  saveUser() {
    let index=this.signupDetails.username.lastIndexOf('@');
    this.signupDetails.username=this.signupDetails.username.substring(0,index).toLowerCase();
    this.signupDetails.uid=Math.floor(Math.random()*100000+1).toString();
    console.log(this.signupDetails);
    this._signupService.addUser(this.signupDetails).pipe(catchError(this.handleError.bind(this))).subscribe((data)=>{
      console.log(data);
      this._router.navigate(['/login']);
    });
  }


  alreadyExist:boolean=false;

  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.status==417)
    {
      this.alreadyExist=true;
      this.formErrors.username="User Already Exist";
    }
    return throwError(() => new Error('there is a problem with the service.'));
  }
}
