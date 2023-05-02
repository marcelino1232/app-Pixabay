import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit,OnDestroy{

  termino = '';
  subscription:Subscription;
  listImagen:any[] = [];
  loading = false;

  pages = 0;
  columRow = 30;
  pageActual = 1;

  constructor(private _imagenService:ImagenService){
    this.subscription = _imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.pageActual = 1;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  obtenerImagenes(){
    this._imagenService.getImagenes(this.termino,this.columRow,this.pageActual).subscribe(data => {
     this.mostrarAnimacion();
     if(data.hits.length === 0){
      this._imagenService.setError('Opss.. no encontramos ningun resultado');
      return;
     }

     this.pages = Math.ceil(data.totalHits / this.columRow);
     console.log(this.pages)
     this.listImagen = data.hits;
     
     console.log(this.listImagen);
     }, error => {
      this._imagenService.setError('Opss.. ocurrio un error');
     })
  }

  mostrarAnimacion(){
    this.loading =  true;
    setTimeout(() => {
      this.loading = false;
    },2000);
  }



  anteriorPage(){
    this.pageActual--;
    this.listImagen = [];
    this.obtenerImagenes();
  }

  visibleButtonNext(){
    if(this.pageActual === this.pages){
      return false;
    }else{
      return true;
    }
  }

  visibleButtonBack(){
    if(this.pageActual === 1){
      return false;
    }else{
      return true;
    }
  }

  siguientePage(){
    this.pageActual++;
    this.listImagen = [];
    this.obtenerImagenes();
  }

}
