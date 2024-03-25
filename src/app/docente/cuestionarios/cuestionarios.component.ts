import { Component } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.scss']
})
export class CuestionariosComponent {
  examenes : any = [];
  nombreABuscar: string = '';
  examenesFiltrados: any[] = [];

  constructor(private cuestionarioService:CuestionarioService) { }

  ngOnInit(): void {
    this.cuestionarioService.listarCuestionariosPorUsuario().subscribe(
      (dato:any) => {
        this.examenes = dato;
        this.examenesFiltrados = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los test','error');
      }
    )
  }
  filtrarExamenes() {
    this.examenesFiltrados = this.examenes.filter((examen: any) =>
      examen.titulo.toLowerCase().includes(this.nombreABuscar.toLowerCase())
    );
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar Test',
      text:'¿Estás seguro de eliminar el test?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.cuestionarioService.eliminarExamen(examenId).subscribe(
          (data) => {
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire('Test eliminado','El test ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el test','error');
          }
        )
      }
    })
  }

}
