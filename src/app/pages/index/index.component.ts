import { Component, OnInit } from '@angular/core';
import { Globales } from 'src/app/class/globales';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private api : ApiService) {

    this.api.consulta(Globales.apiPost + 'post', {}, 'get').toPromise()
    .then(resp => {
      console.log(resp);
      

    })
   }

  ngOnInit(): void {
  }

}
