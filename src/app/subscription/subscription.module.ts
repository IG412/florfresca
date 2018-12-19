import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {PlanComponent} from './plan/plan.component';
import {PaymentComponent} from './payment/payment.component';
import {NavbarComponent} from '../blocks/navbar/navbar.component';
import {FooterComponent} from '../blocks/footer/footer.component';
import {SubcriptionRoutingModule} from './subcription-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {SubscriptionComponent} from './subscription.component';
import { RegistroComponent } from './registro/registro.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  imports: [
    SubcriptionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SubscriptionComponent,
    PlanComponent,
    SummaryComponent,
    PaymentComponent,
    RegistroComponent
  ],
  providers: [],
  bootstrap: [SubscriptionComponent]
})
export class SubscriptionModule { }
