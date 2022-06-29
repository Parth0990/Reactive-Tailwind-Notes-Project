import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotesModel } from '../Models/notesModel';
import { NotesService } from '../Services/notes.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  constructor(private router: Router,private _noteService:NotesService) { }

  ngOnInit(): void {
  }

  @Output()
  onNoteDeleteEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() snote!:NotesModel;

  editNote(nid:string) {
    this.router.navigate(['/addnotes', nid]);
  }
  
  deleteNote(nid: string) {
    this._noteService.deleteNotes(nid).subscribe((data)=>{
      console.log(data);
      this.onNoteDeleteEvent.emit('deleted');
    })
    
   }

}
