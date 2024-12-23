import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'movie' , canActivate:[authGuard, adminGuard], component: MoviesComponent},
  {path:'movies', canActivate:[authGuard], component: MovieListComponent}, 
];

// canActivate:[authGuard, adminGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
