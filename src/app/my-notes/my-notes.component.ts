import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesModel } from '../Models/notesModel';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {

  constructor(private router: Router) { }

  notes: NotesModel[] = [{
    id: 0,
    uid: '',
    noteid: '',
    title: '',
    description: "",
    modifyDate: "",
    createDate: ''
  }]

  ngOnInit(): void {
  }

  editNote(nid:string) {
    this.router.navigate(['/addnotes', nid]);
  }
  deleteNote() { }

}
