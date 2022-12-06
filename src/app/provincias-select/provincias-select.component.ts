import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Provincia, ProvinciasService } from '../services/provincias.service';


@Component({
  selector: 'app-provincias-select',
  templateUrl: './provincias-select.component.html',
  styleUrls: ['./provincias-select.component.css']
})


export class ProvinciasSelectComponent {
  constructor (
    private ProvinciasService: ProvinciasService,
    private router: Router
    ) {
    this.ProvinciasService.getProvincias().subscribe((data: any) => {
      // console.log(data);
      this.provincias = data;
    });
  }

  provincias: Provincia [] = [
    // {
    //   nombre: 'Bs As',
    //   id: 1,
    // },
    // {
    //   nombre: 'CABA',
    //   id: 2,
    // },
  ]
  provinciaSeleccionada: Provincia = {
    nombre: '',
    id: 0,
    url: '',
  };

  handleOnClickButton() {
    this.router.navigateByUrl(
      `/provincias/${this.provinciaSeleccionada.nombre
        .toLowerCase()
        .replace(/ /g, '-')}/productos`
    );
  }
}

