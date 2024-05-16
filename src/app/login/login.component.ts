import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginData = {
    "username" : '',
    "password" : ''
  }
  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("clic en el boton de login");
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'Admin'){
            
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'Normal'){
            
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    )
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '700px', // ajusta el ancho según tus necesidades
      height:'600px'
      // otras propiedades como height, data, etc.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      // Vuelve a listar las asignaturas después de cerrar el modal
     
    });
  }

}
