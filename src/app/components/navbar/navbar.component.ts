import { Component, OnInit } from '@angular/core';
import { Globales } from 'src/app/class/globales';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public globales = Globales;

  constructor() { }

  ngOnInit(): void {
  }

}
