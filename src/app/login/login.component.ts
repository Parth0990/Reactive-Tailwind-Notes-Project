import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../Models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetail!: FormGroup;
  loginDetails: LoginModel={
    id: 0,
    uid: 0,
    email: "",
    password: ""
  };

  formErrors = {
    email: "",
    password: ""
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
    },
    'password': {
      'required': 'password is required'
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginDetail = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logValidationErrors(group: FormGroup = this.loginDetail): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractFormControl = group.get(key);

      (this.formErrors as any)[key] = '';
      if ((abstractFormControl && !abstractFormControl.valid) && (abstractFormControl.touched || abstractFormControl.dirty)) {
        const messages = (this.validationMessages as any)[key];
        console.log(abstractFormControl.errors);
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
        for( const control of abstractFormControl.controls){
          if(control instanceof FormGroup){
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

  saveUser(){

  }
}
