import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NavBoxComponent} from './nav-box/nav-box.component';
import {LearningComponent} from './pages/learning/learning.component';
import {PractiseComponent} from './pages/practise/practise.component';
import {CalculatorComponent} from './pages/calculator/calculator.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {FormsModule} from "@angular/forms";
import { TableauComponent } from './pages/calculator/calculator-content/tableau/tableau.component';
import { LargeLpComponent } from './pages/calculator/calculator-content/large-lp/large-lp.component';
import { CardComponent } from './pages/calculator/card/card.component';
import {LinearSystemComponent} from "./pages/calculator/calculator-content/linear-system/linear-system.component";
import { StandardFormComponent } from './pages/calculator/calculator-content/standard-form/standard-form.component';
import { SolutionComponent } from './pages/calculator/calculator-content/solution/solution.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBoxComponent,
    LearningComponent,
    PractiseComponent,
    CalculatorComponent,
    HomeComponent,
    TableauComponent,
    LargeLpComponent,
    CardComponent,
    LinearSystemComponent,
    StandardFormComponent,
    SolutionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
