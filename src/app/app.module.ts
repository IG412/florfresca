import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './blocks/footer/footer.component';
import { NavbarComponent } from './blocks/navbar/navbar.component';
import { SlideComponent } from './home/slide/slide.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './account/login/login.component';
import { RecoveryComponent } from './account/recovery/recovery.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetComponent } from './account/reset/reset.component';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './page/faq/faq.component';
import { WhyComponent } from './page/why/why.component';
import { CareComponent } from './page/care/care.component';
import { ActivateComponent } from './account/activate/activate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SlideComponent,
    EmailComponent,
    LoginComponent,
    RecoveryComponent,
    RegisterComponent,
    ResetComponent,
    FaqComponent,
    WhyComponent,
    CareComponent,
    ActivateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
