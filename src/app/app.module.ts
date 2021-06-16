import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationBoxComponent } from './navigation-box/navigation-box.component';
import { LearningComponent } from './pages/learning/learning.component';
import { PractiseComponent } from './pages/practise/practise.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationBoxComponent,
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
