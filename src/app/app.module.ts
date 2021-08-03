import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AdminComponent} from './pages/admin/admin.component'
import {AdminEditExerciseComponent} from './pages/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './pages/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './pages/admin-new-exercise/admin-new-exercise.component'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {CalculatorComponent} from './pages/calculator/calculator.component'
import {CardComponent} from './components/card/card.component'
import {ExerciseComponent} from './pages/exercise/exercise.component'
import {FormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
import {HttpClientModule} from '@angular/common/http'
import {LearningComponent} from './pages/learning/learning.component'
import {LinearSystemDataComponent} from './pages/calculator/calculator-content/linear-system-data/linear-system-data.component'
import {LinearSystemSize} from './pages/calculator/calculator-content/linear-system-size/linear-system-size.component'
import {NavBarComponent} from './nav-bar/nav-bar.component'
import {NavBoxComponent} from './nav-box/nav-box.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {PractiseComponent} from './pages/practise/practise.component'
import {SolutionComponent} from './pages/calculator/calculator-content/solution/solution.component'
import {StandardFormComponent} from './pages/calculator/calculator-content/standard-form/standard-form.component'
import {TableauComponent} from './pages/calculator/calculator-content/tableau/tableau.component'
import {VarDirective} from '../ng-var.directive'

@NgModule({
  declarations: [
    AdminComponent,
    AdminEditExerciseComponent,
    AdminExercisesComponent,
    AdminNewExerciseComponent,
    AppComponent,
    CalculatorComponent,
    CardComponent,
    ExerciseComponent,
    HomeComponent,
    LearningComponent,
    LinearSystemDataComponent,
    LinearSystemSize,
    NavBarComponent,
    NavBoxComponent,
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
