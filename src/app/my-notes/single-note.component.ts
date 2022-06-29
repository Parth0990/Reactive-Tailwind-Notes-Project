import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NotesModel } from '../Models/notesModel';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() snote!:NotesModel;

  editNote(nid:string) {
    this.router.navigate(['/addnotes', nid]);
  }
  deleteNote() { }

}
