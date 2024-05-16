import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonsComponent } from './material-component/buttons/buttons.component';
import { AsignaturasComponent } from './docente/asignaturas/asignaturas.component';
import { AdminGuardService } from './services/admin.guard.service';
import { AddAsignaturaComponent } from './docente/add-asignatura/add-asignatura.component';
import { CuestionariosComponent } from './docente/cuestionarios/cuestionarios.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch:'full',
  },

  {
    path:'admin',
    component:FullComponent,
    canActivate:[AdminGuardService],

    children: [
      {
        path: '',
        component:DashboardComponent
      },
      {
        path: 'asignaturas',
        component:AsignaturasComponent
      },
      {
        path:'nueva-asignatura',
        component:AddAsignaturaComponent
      },
      {
        path:'cuestionarios',
        component:CuestionariosComponent
      }
      
    ]
  },
  {
    path:'user-dashboard',
    component:ButtonsComponent,
    canActivate:[AdminGuardService],
    children : [
      {
        path:'',
        component:ButtonsComponent
      },
    
    ]
    }
];
