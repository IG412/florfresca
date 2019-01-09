import { ResetComponent } from './account/reset/reset.component';
import { RegisterComponent } from './account/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import {PlanComponent} from './subscription/plan/plan.component';
import { RecoveryComponent } from './account/recovery/recovery.component';
import { ActivateComponent } from './account/activate/activate.component';
import { ProfileComponent } from './account/profile/profile.component';
import { FaqComponent } from './page/faq/faq.component';
import { WhyComponent } from './page/why/why.component';
import { CareComponent } from './page/care/care.component';
import { IsSecureGuard } from './http-interceptors/IsSecureGuard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , canActivate: [IsSecureGuard]},
  { path: 'login', component: LoginComponent , canActivate: [IsSecureGuard]},
  { path: 'recovery', component: RecoveryComponent , canActivate: [IsSecureGuard]},
  { path: 'register', component: RegisterComponent , canActivate: [IsSecureGuard]},
  { path: 'reset/:id', component: ResetComponent , canActivate: [IsSecureGuard]},
  { path: 'activate/:id', component: ActivateComponent , canActivate: [IsSecureGuard]},
  { path: 'faq', component: FaqComponent, canActivate: [IsSecureGuard] },
  { path: 'Por_que_flor_fresca', component: WhyComponent , canActivate: [IsSecureGuard]},
  { path: 'cuidados', component: CareComponent , canActivate: [IsSecureGuard]},
  { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule'},
  { path: 'account', loadChildren: './account/profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [IsSecureGuard]
})
export class AppRoutingModule { }
