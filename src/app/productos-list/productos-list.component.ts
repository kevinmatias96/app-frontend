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
  productos: Producto [] = [];
  provinciaSlctd: string = 'tierra-del-fuego'
  colorTitulo: string = 'primary'

  constructor (
    private productoSrv: ProductosService,
    actRoute: ActivatedRoute) {
    const { nombreProvincia } = actRoute.snapshot.params;

    this.provinciaSlctd = nombreProvincia;
    
    this.productoSrv.getProductos(this.provinciaSlctd).subscribe((data: any) => {
      // console.log(data[0]); 
      this.productos = data;
    });
  }
}
