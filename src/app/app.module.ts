import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBoxComponent } from './nav-box/nav-box.component';
import { LearningComponent } from './pages/learning/learning.component';
import { PractiseComponent } from './pages/practise/practise.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBoxComponent,
    LearningComponent,
    PractiseComponent,
    CalculatorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
