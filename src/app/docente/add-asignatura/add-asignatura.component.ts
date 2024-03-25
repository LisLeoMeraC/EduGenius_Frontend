import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-asignatura',
  templateUrl: './add-asignatura.component.html',
  styleUrls: ['./add-asignatura.component.scss']
})
export class AddAsignaturaComponent implements OnInit {

  categoria = {
   titulo : '',
   descripcion : '',
   uniqueCode: ''
 }
 

 constructor(private AsignaturaService:AsignaturasService,private snack:MatSnackBar,private router:Router , private dialogRef: MatDialogRef<AddAsignaturaComponent>) { }

 ngOnInit(): void {
 }

 formSubmit(){
   if(this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
     this.snack.open("El título es requerido !!",'',{
       duration:3000
     })
     return ;
   }

   this.AsignaturaService.agregarCategoria(this.categoria).subscribe(
     (dato:any) => {
       this.categoria.titulo = '';
       this.categoria.descripcion = '';
       this.categoria.uniqueCode='',
       Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
       this.dialogRef.close();
       this.router.navigate(['/admin/asignaturas']);
     },
     (error) => {
       console.log(error);
       Swal.fire('Error !!','Error al guardar la categoría','error')
     }
   )
 }

 //Generar un codigo unico para cada asignatura que se registre
 generateUniqueCode(){
   this.categoria.uniqueCode=Math.random().toString(36).substr(2,9);
 }

 CloseModal(){
  this.dialogRef.close();
 }


}
