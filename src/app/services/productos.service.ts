import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  cargada = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http:HttpClient) { 
      this.cargarProducto();      
  }

  private cargarProducto(){
    return new Promise(  ( resolve, reject ) => {

      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            this.cargada = false;
            //resolve();
          });

    });
  }

  getProducto(id:string){
    return this.http.get(`https://angular-html-b10e2-default-rtdb.firebaseio.com/Productos/${id}.json`);
                    
  }
  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProducto().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }

}
