import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { IntroduccionGuard } from './guards/introduccion.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminstartGuard } from './guards/adminstart.guard';


const routes: Routes = [
  {
    path: 'main-mesero',
    loadChildren: () => import('./pages/meseroPages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data:{rol: 'mesero'}
  },
  {
    path: 'main-cocinero',
    loadChildren: () => import('./pages/cocineroPages/tabsc/tabsc.module').then( m => m.TabscPageModule),
    canActivate: [AuthGuard],
    data:{rol: 'cocinero'}
  },
  {
    path: 'main-admin',
    loadChildren: () => import('./pages/adminPages/tabsa/tabsa.module').then( m => m.TabsaPageModule),
    canActivate: [AuthGuard, AdminstartGuard],
    data:{rol: 'gerente'}
  },  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [IntroduccionGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    canActivate: [IntroduccionGuard]
  },
  
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
 
  {
    path: 'adminstart',
    loadChildren: () => import('./pages/adminstart/adminstart.module').then( m => m.AdminstartPageModule),
    
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ComponentsModule
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
