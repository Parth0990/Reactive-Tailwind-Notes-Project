import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesComponent } from './notes/notes.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http'
import { NotesService } from './Services/notes.service';
import { SingleNoteComponent } from './my-notes/single-note.component';
import { LoginService } from './Services/login.service';
import { SignUpService } from './Services/signup.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    NotesComponent,
    MyNotesComponent,
    SignUpComponent,
    SingleNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NotesService,LoginService,SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
