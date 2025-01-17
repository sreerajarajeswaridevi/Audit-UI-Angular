import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
// import { AuthGuard } from './auth/guards/auth.guard';
import { MainComponent } from './core/main/main.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AdminComponent } from './admin/containers/admin/admin.component';
import { AdminGuard } from './admin/guard/admin.guard';
import { ManagerGuard } from './admin/guard/manager.guard';
// import { AdminComponent } from './admin/containers/admin/admin.component';
// import { AdminGuard } from './admin/guard/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: MainComponent},
    { path: 'poojas', loadChildren: './poojas/poojas.module#PoojasModule'},
    { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesModule'},
    { path: 'donations', loadChildren: './donations/donations.module#DonationsModule'},
    { path: 'settings', loadChildren: './profile/profile.module#ProfileModule' },
    { path: 'admin-panel', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'reports', loadChildren: './charts/charts.module#ChartsDataModule', canActivate: [ManagerGuard] },
    // { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', canActivate: [AuthGuard]},
    // { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', canActivate: [AuthGuard]},
    // { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    // { path: 'admin-panel', component: AdminComponent, canActivate: [AdminGuard]}
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
