import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../Models/LoginModel';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupDetail!: FormGroup;
  signupDetails: LoginModel={
    id: 0,
    uid: 0,
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
    },
    'password': {
      'required': 'password is required'
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupDetail = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logValidationErrors(group: FormGroup = this.signupDetail): void {
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
