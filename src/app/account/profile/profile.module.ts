import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {ProfileComponent} from './profile.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MySubsComponent } from './my-subs/my-subs.component';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { DetailComponent } from './my-subs/detail/detail.component';


@NgModule({
  imports: [
    RoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent,
    MyAccountComponent,
    MySubsComponent,
    MyCardsComponent,
    DetailComponent
  ],
  providers: [],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
