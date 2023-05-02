import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {

  mensaje:string = '';
  estado:boolean = false; 
  subscription:Subscription

  constructor(private _imagenService:ImagenService)
  {
    this.subscription = _imagenService.getError().subscribe(data => {
      this.mostrarError(data);
    });
  }

  mostrarError(descripcion:string){
    this.estado = true;
    this.mensaje = descripcion;
    setTimeout(() => {
      this.estado = false;
    },2000);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
