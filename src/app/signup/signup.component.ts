import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  public user={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:'',
    identidad:'',
    rolFormulario:''
  }

  constructor(private userService:UserService, private snack:MatSnackBar, private router:Router, private dialogRef: MatDialogRef<SignupComponent>){ }

  ngOnInit(): void {
    
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username==''||this.user.username==null){
      this.snack.open('El nombre de usuario es requerido!!','Aceptar',{
        duration: 3000,
        verticalPosition : 'top',
        horizontalPosition: 'right'
      })
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Usuario Guardado','Usuario registrado con éxito en el sistema','success')
        this.dialogRef.close();
        this.router.navigate(['login']);
      },(error)=>{
        console.log(error);
        this.snack.open('Ya hay un usuario registrado con ese nombre!!','Aceptar',{
          duration: 3000
        })
      }
    )
    
  }
}

