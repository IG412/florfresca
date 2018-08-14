import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanComponent} from './plan/plan.component';
import {SubscriptionComponent} from './subscription.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,

    children: [
      { path: '', redirectTo: 'plan' },
      { path: 'plan', component: PlanComponent }
    ]
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class SubcriptionRoutingModule { }
