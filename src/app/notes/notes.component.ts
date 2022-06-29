import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  Submit() {
    this._router.navigate(['/allnotes']);
  }

}
