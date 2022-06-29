import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotesModel } from '../Models/notesModel';
import { NotesService } from '../Services/notes.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {

  constructor(private router: Router, private _noteService: NotesService) { }

  notes: NotesModel[] = [{
    id: 0,
    uid: '',
    noteid: '',
    title: '',
    note: "",
    modifyDate: "",
    createDate: ''
  }]


  deleteEvent(d:string)
  {
    console.log('called');
    this._noteService.getNotes(localStorage.getItem('uid')||"").pipe(catchError(this.handleError.bind(this))).subscribe((data)=>{
      this.notes=data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this._noteService.getNotes(localStorage.getItem('uid')||"").pipe(catchError(this.handleError.bind(this))).subscribe((data)=>{
      this.notes=data;
      console.log(data);
    })
  }

  isEmpty:boolean=false;

  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.status==404)
    {
      this.isEmpty=true;
      this.notes.splice(1);
      //console.log(this.isEmpty);
      
    }
    return throwError(() => new Error('there is a problem with the service.'));
  }


}
