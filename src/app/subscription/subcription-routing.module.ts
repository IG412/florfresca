import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanComponent} from './plan/plan.component';
import {SubscriptionComponent} from './subscription.component';
import {SummaryComponent} from './summary/summary.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,

    children: [
      { path: '', redirectTo: 'plan' },
      { path: 'plan', component: PlanComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'payment', component: PaymentComponent }
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
