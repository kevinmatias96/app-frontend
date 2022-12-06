import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProvinciasSelectComponent } from './provincias-select/provincias-select.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinciasSelectComponent,
  },
  {
    path: 'productos',
    component: ProductosListComponent,
  },
  {
    path: 'provincias',
    component: ProvinciasSelectComponent,
  },
  {
    path: 'provincias/:nombreProvincia/productos',
    component: ProductosListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
