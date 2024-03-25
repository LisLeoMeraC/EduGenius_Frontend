import { Component } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddAsignaturaComponent } from '../add-asignatura/add-asignatura.component';




@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent {

  asignaturas:any = [

  ]

  constructor(private asignaturaService: AsignaturasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarAsignaturas();
  }

  openAsignaturaModal() {
    const dialogRef = this.dialog.open(AddAsignaturaComponent, {
      width: '500px', // ajusta el ancho según tus necesidades
      // otras propiedades como height, data, etc.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      // Vuelve a listar las asignaturas después de cerrar el modal
      this.listarAsignaturas();
    });
  }

  listarAsignaturas() {
    this.asignaturaService.listarCategorias().subscribe(
      (dato: any) => {
        this.asignaturas = dato;
        console.log(this.asignaturas);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar las categorias', 'error');
      }
    );
  }

}
