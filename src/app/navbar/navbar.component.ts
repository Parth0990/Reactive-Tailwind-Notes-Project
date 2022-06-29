import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  readLocalStorageValue(key:string) {
    return localStorage.getItem(key);
  }
  removeKey()
  {
    localStorage.clear();
  }
  ngOnInit(): void {
  }

}
