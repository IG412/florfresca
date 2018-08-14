import { NgModule } from '@angular/core';
import {SummaryComponent} from './summary/summary.component';
import {PlanComponent} from './plan/plan.component';
import {PaymentComponent} from './payment/payment.component';
import {NavbarComponent} from '../blocks/navbar/navbar.component';
import {FooterComponent} from '../blocks/footer/footer.component';
import {SubcriptionRoutingModule} from './subcription-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {SubscriptionComponent} from './subscription.component';
import {SlideComponent} from './slide/slide.component';

@NgModule({
  imports: [
    SubcriptionRoutingModule,
  ],
  declarations: [
    SubscriptionComponent,
    PlanComponent,
    SummaryComponent,
    PaymentComponent,
    SlideComponent
  ],
  providers: [],
  bootstrap: [SubscriptionComponent]
})
export class SubscriptionModule { }
