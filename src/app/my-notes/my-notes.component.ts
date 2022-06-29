import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this._noteService.getNotes(localStorage.getItem('uid')||"abc").subscribe((data)=>{
      this.notes=data;
      console.log(data);
    })
  }


}
