import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {MyCardsComponent} from './my-cards/my-cards.component';
import {MySubsComponent} from './my-subs/my-subs.component';
import {DetailComponent} from './my-subs/detail/detail.component';
import {AuthService} from "../../services/auth.service";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,

    children: [
      { path: '', redirectTo: 'profile' },
      { path: 'profile', component: MyAccountComponent, canActivate:[AuthService] },
      { path: 'cards', component: MyCardsComponent, canActivate:[AuthService] },
      { path: 'subs', component: MySubsComponent, canActivate:[AuthService] },
      { path: 'subs/:id', component: DetailComponent, canActivate:[AuthService] }
    ]
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule],
  providers: [ AuthService ]
})
export class RoutingModule { }