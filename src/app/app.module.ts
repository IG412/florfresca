import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './blocks/footer/footer.component';
import { NavbarComponent } from './blocks/navbar/navbar.component';
import { SlideComponent } from './home/slide/slide.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import { WhyComponent } from './why/why.component';
import { RseComponent } from './rse/rse.component';
import { HelpComponent } from './help/help.component';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SlideComponent,
    WhyComponent,
    RseComponent,
    HelpComponent,
    EmailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
