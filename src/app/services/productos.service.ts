import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos(slugProvincia: string) {
    let url = './assets/api/' + slugProvincia + '.json';
    console.log(url)
    return this.http.get(url)
    .pipe(
      map((data: any ) => {
        data.values.shift()
        data.values.shift()
        return data.values.map ((producto: any) => {
          let precio = producto[2]
          precio = precio.replace('.', '')
          precio = precio.replace(',', '.')
          
          return {
            ean: parseInt(producto[0]),
            nombre: producto[1],
            precio: parseFloat(producto[2]),
            // precioOriginal: precio[2],
          }
        })
      })
    )
  }
}
