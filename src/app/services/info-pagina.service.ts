import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
    info: InfoPagina ={};
    cargada = false;
    equipo: any[] =[];

  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){    
    this.http.get('assets/data/data-paginas.json')
             .subscribe( (resp: InfoPagina) => {
              this.cargada = true;
              this.info = resp;              
             });
  }

  private cargarEquipo(){
    console.log("Sericio de cargarEquipo listo");
    this.http.get('https://angular-html-b10e2-default-rtdb.firebaseio.com/Equipo.json')
             .subscribe( (resp:any) => {
              this.equipo = resp;
              console.log(resp);
             });
  }
}
