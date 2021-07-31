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
import {LinearSystemSize} from './pages/calculator/calculator-content/linear-system-size/linear-system-size.component';
import {CardComponent} from './components/card/card.component';
import {SolutionComponent} from './pages/calculator/calculator-content/solution/solution.component';
import {VarDirective} from "../ng-var.directive";
import {LinearSystemDataComponent} from './pages/calculator/calculator-content/linear-system-data/linear-system-data.component';
import {StandardFormComponent} from './pages/calculator/calculator-content/standard-form/standard-form.component';
import {TableauComponent} from './pages/calculator/calculator-content/tableau/tableau.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ExerciseComponent} from './pages/exercise/exercise.component';
import {AdminExerciesComponent} from './pages/admin-exercies/admin-exercies.component';
import {HttpClientModule} from "@angular/common/http";
import {AdminExercisesDifficultyComponent} from './pages/admin-exercises-difficulty/admin-exercises-difficulty.component';


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CardComponent,
    HomeComponent,
    LearningComponent,
    LinearSystemDataComponent,
    LinearSystemSize,
    NavBarComponent,
    NavBoxComponent,
    TableauComponent,
    PractiseComponent,
    SolutionComponent,
    StandardFormComponent,
    VarDirective,
    AdminComponent,
    ExerciseComponent,
    AdminExerciesComponent,
    AdminExercisesDifficultyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
