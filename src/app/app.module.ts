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
import {TableauComponent} from './pages/calculator/calculator-content/tableau/tableau.component';
import {LinearSystemSize} from './pages/calculator/calculator-content/linear-system-size/linear-system-size.component';
import {CardComponent} from './pages/calculator/card/card.component';
import {SolutionComponent} from './pages/calculator/calculator-content/solution/solution.component';
import {VarDirective} from "../ng-var.directive";
import { LinearSystemDataComponent } from './pages/calculator/calculator-content/linear-system-data/linear-system-data.component';
import { StandardFormComponent } from './pages/calculator/calculator-content/standard-form/standard-form.component';
import {NewTableauComponent} from './pages/calculator/calculator-content/new-tableau/new-tableau.component';


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
    LinearSystemSize,
    CardComponent,
    SolutionComponent,
    VarDirective,
    LinearSystemDataComponent,
    StandardFormComponent,
    NewTableauComponent

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
