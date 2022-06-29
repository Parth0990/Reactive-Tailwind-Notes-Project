import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesModel } from '../Models/notesModel';
import { NotesService } from '../Services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private _router: Router, private _route: ActivatedRoute , private noteService: NotesService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((parameterMap) => {
      let id = +(parameterMap.get('id') || 0);
      console.log(id);
      this.getNotes(id);
    });
  }

  note!: NotesModel;
  panelTitle!: string;
  private getNotes(id: number) {
    if (id === 0) {
      this.note = {
        id: 0,
        uid: '',
        noteid: '',
        title: '',
        description: "",
        modifyDate: "",
        createDate: ''
      };
      this.panelTitle = 'Add Note';
      // this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Note';
      //this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this.noteService.getNotes(id).subscribe((data) => {
        this.note = data;
      });
    }
  }

  Submit(){
    
  }

}
