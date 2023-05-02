import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http:HttpClient) {

  }

  setError(mensaje:string){
    this.error$.next(mensaje);
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string>
  {
    return this.terminoBusqueda$.asObservable();
  }



  getImagenes(termino:string,columRows:number,pageActual:number):Observable<any>{
    const key = '35761249-b4cac88cc8933dbbbb6501c16';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${columRows}&page=${pageActual}`;

    return this.http.get(url);
  }
}
