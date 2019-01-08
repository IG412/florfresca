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
import { IsSecureGuard } from './http-interceptors/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset/:id', component: ResetComponent },
  { path: 'activate/:id', component: ActivateComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'Por_que_flor_fresca', component: WhyComponent },
  { path: 'cuidados', component: CareComponent },
  { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionModule'},
  { path: 'account', loadChildren: './account/profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
