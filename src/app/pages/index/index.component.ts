import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Globales } from 'src/app/class/globales';
import { ApiService } from 'src/services/api/api.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public arrayPosts: Array<any> = [];
  public formulario: FormGroup;

  constructor(private api : ApiService) {

    this.api.consulta(Globales.apiPost + 'post', {}, 'get').toPromise()
    .then(resp => {
      console.log(resp);
      this.arrayPosts = resp;
    })

    this.formulario = new FormGroup({
      txtFechaCreacion: new FormControl(''),
      txtTitulo: new FormControl(''),
      txtTexto: new FormControl('')
    });
   }

   enviarPost() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    const datos = {
      'fechaCreacion': this.formulario.get('txtFechaCreacion')?.value,
      'titulo': this.formulario.get('txtTitulo')?.value,
      'texto': this.formulario.get('txtTexto')?.value
    }

    this.api.consulta(Globales.apiPost + 'post/crear', datos, 'post').toPromise()
      .then(respuesta => {
        console.log(respuesta);

        if (respuesta.Status != null) {
          Toast.fire({
            icon: 'error',
            title: 'Se ha presentado un error'
          })

        }else{
          Toast.fire({
            icon: 'success',
            title: 'Enviado con exito',
            didClose: () => {
              window.location.reload();
            }
          })

          this.formulario.reset();

        }

      }).catch(error => {
        console.log(error);
        Swal.fire(
          'error!',
          error.Message,
          'error'
        );

      });
      window.location.reload();
  
   }
   eliminarPost(idPost: any){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Swal.fire({
      title: '¿Está seguro que desea eliminar el post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('entro a confirmar');


        this.api.consulta(Globales.apiPost + 'post/'+idPost, { }, 'delete').toPromise()
          .then(respuesta => {
            console.log(respuesta);

            if (respuesta.Status != null) {
              Toast.fire({
                icon: 'error',
                title: respuesta.Message,
                timer: 2000,
              })

            } else {

              Toast.fire({
                icon: 'success',
                title: 'Post eliminado correctamente',
                timer: 2000,
                didClose: () => {
                  window.location.reload();
                }
              })
            }


          }).catch(error => {
            console.log(error);


            Toast.fire({
              icon: 'error',
              title: error.Message
            })
          });
      }
    })

   }

  ngOnInit(): void {
  }

}
