import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';

export interface Producto {
  ean: number,
  nombre:string,
  precio:number,
}

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent {
  // Guarda todos los productos (backup)
  productos: Producto [] = [];
  // Guarda solamente los que cumplan con los filtros ingresados
  productosFiltrados: Producto[] = [];
  provinciaSlctd: string = 'tierra-del-fuego';
  colorTitulo: string = 'primary';
  filtroTexto: string = '';
  filtroPrecio: number = 0;
  precioMaximo: number = 0;

  constructor (
    private productoSrv: ProductosService,
    actRoute: ActivatedRoute) {
    const { nombreProvincia } = actRoute.snapshot.params;

    this.provinciaSlctd = nombreProvincia;
    
    this.productoSrv.getProductos(this.provinciaSlctd).subscribe((data: any) => {
      // console.log(data[0]); 
      this.productos = data;
      this.productosFiltrados = data;
      let precios = this.productos.map((producto: Producto) => producto.precio);         
      this.precioMaximo = Math.max(...precios);
      this.filtroPrecio = this.precioMaximo;
    });
  }

  // Filtrar productos cuando Usuario ingresa texto en el input
  handleOnChangeFiltroTexto(event: any) {
    // console.log(event)
    
    // FILTRAR TAMBIEN POR PRECIO
    this.productosFiltrados = this.productos.filter((producto: Producto) => {
      if (this.filtroPrecio !=0) {
        // filtrar por ambos
        return (producto.nombre.toLowerCase().includes (event.toLowerCase()) 
          || (producto.ean + '').includes(event)) && producto.precio <= this.filtroPrecio;
      }
      else{
        // filtrar por texto
        return producto.nombre.toLowerCase().includes (event.toLowerCase()) 
          || (producto.ean + '').includes(event)
      }
      
      // producto.nombre.toLowerCase().includes (event.toLowerCase()) 
      //     || (producto.ean + '').includes(event)
    })
  }

  handleOnChangeFiltroPrecio(event: any){
    // FILTRAR TAMBIEN POR TEXTO
    this.productosFiltrados = this.productos.filter((producto: Producto) => {
      return producto.precio <= event;
    })    
  }
}
