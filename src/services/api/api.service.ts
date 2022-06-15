import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  public consulta(url: string, datos: any, tipo: string, headers: any = null, progreso = false): Observable<any> {

    let headerConsulta = this.getHeaderPrincipal();

    if (headers != null) {
      headerConsulta = headerConsulta.delete(headers[0]);
      headerConsulta = headerConsulta.append(headers[0], headers[1]);
    }

    let httpOptions: any = {
      headers: headerConsulta,
      reportProgress: progreso,
      observe: progreso ? 'events' : 'body'
    };


   
       if (tipo === 'post') {

      return this.httpClient.post(url, datos,httpOptions);

    } else if (tipo === 'get') {

      /* console.log(datos); */

      /* if (datos != null) {
        httpOptions.params = datos
      } */
      return this.httpClient.get(url,httpOptions)

    } else if (tipo === 'put') {

      return this.httpClient.put(url, datos,httpOptions)

    } else if (tipo == 'delete') {

      
      return this.httpClient.delete(url,httpOptions)
    }

    return new Observable;
  }; 

  private getHeaderPrincipal() {

    let cabecera = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Allow' : 'POST, GET, PUT, DELETE'
    });


    return cabecera;
  }
  
}
