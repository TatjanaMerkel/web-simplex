import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import {AdminEditExerciseComponent} from './pages/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './pages/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './pages/admin-new-exercise/admin-new-exercise.component'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {CalculatorComponent} from './pages/calculator/calculator.component'
import {CardComponent} from './components/card/card.component'
import {ExerciseComponent} from './pages/exercise/exercise.component'
import {HomeComponent} from './pages/home/home.component'
import {LearningComponent} from './pages/learning/learning.component'
import {LinearSystemDataCardComponent} from './components/linear-system-data-card/linear-system-data-card.component'
import {LinearSystemDataComponent} from './components/linear-system-data/linear-system-data.component'
import {LinearSystemSize} from './components/linear-system-size/linear-system-size.component'
import {NavBarComponent} from './components/nav-bar/nav-bar.component'
import {PractiseComponent} from './pages/practise/practise.component'
import {SolutionComponent} from './components/solution/solution.component'
import {StandardFormComponent} from './components/standard-form/standard-form.component'
import {TableauComponent} from './components/tableau/tableau.component'
import {VarDirective} from '../ng-var.directive'

@NgModule({
  declarations: [
    AdminEditExerciseComponent,
    AdminExercisesComponent,
    AdminNewExerciseComponent,
    AppComponent,
    CalculatorComponent,
    CardComponent,
    ExerciseComponent,
    LearningComponent,
    LinearSystemDataCardComponent,
    LinearSystemDataComponent,
    LinearSystemSize,
    NavBarComponent,
    HomeComponent,
    PractiseComponent,
    SolutionComponent,
    StandardFormComponent,
    TableauComponent,
    VarDirective
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
