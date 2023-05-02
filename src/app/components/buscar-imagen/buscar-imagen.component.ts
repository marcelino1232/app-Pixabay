import { Component, EventEmitter, Output } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {

  @Output() seekImagen = new EventEmitter<any>();

  nombreImagen:string;

  constructor(private _imagenService:ImagenService){
    this.nombreImagen = '';
  }

  buscarImagen(){

    if(this.nombreImagen === ''){
      this._imagenService.setError('EL CAMPO ES OBLIGATORIO');  
      return;
    }
    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
    this.nombreImagen = '';
  }

 

  

}
