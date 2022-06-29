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
      let nid = (parameterMap.get('id')|| "abc");
      // console.log(nid);
      this.getNotes(nid);
    });
  }

  note!: NotesModel;
  panelTitle!: string;
  private getNotes(nid: string) {
    if (nid == "new") {
      this.note = {
        id: 0,
        uid: '',
        noteid: '',
        title: '',
        note: "",
        modifyDate: "",
        createDate: ''
      };
      this.panelTitle = 'Add Note';
      // this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Note';
      //this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this.noteService.getNotes("000112").subscribe((data) => {
        this.note = data.filter((e)=>nid==e.noteid)[0];
        console.log(this.note);
      });
    }
  }

  saveNote()
  {
    console.log(this.note);

    // TODO 1. GEt UID from local storage. 2. Generate note ID 3. Call post service
  }

  Submit(){
    
  }

}
