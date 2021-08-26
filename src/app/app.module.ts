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
import {CalcComponent} from './pages/calc/calc.component'
import {CardComponent} from './components/card/card.component'
import {ExerciseComponent} from './pages/exercise/exercise.component'
import {HeaderComponent} from './components/header/header.component'
import {HomeComponent} from './pages/home/home.component'
import {LearnComponent} from './pages/learn/learn.component'
import {LearnLinearSystemDataCardComponent} from './components/learn-linear-system-data-card/learn-linear-system-data-card.component'
import {LearnLinearSystemSizeCardComponent} from './components/learn-linear-system-size-card/learn-linear-system-size-card.component'
import {LearnOverviewCardComponent} from './components/learn-overview-card/learn-overview-card.component'
import {LearnStandardFormCardComponent} from './components/learn-standard-form-card/learn-standard-form-card.component'
import {LearnTableausThirdCardComponent} from './components/learn-tableaus-third-card/learn-tableaus-third-card.component'
import {LinearSystemDataCardComponent} from './components/linear-system-data-card/linear-system-data-card.component'
import {LinearSystemDataComponent} from './components/linear-system-data/linear-system-data.component'
import {LinearSystemSizeComponent} from './components/linear-system-size/linear-system-size.component'
import {PracticeComponent} from './pages/practice/practice.component'
import {PracticeExerciseComponent} from './pages/practice-exercise/practice-exercise.component'
import {PracticeLinearSystemDataCardComponent} from './components/practice-linear-system-data-card/practice-linear-system-data-card.component'
import {PracticeLinearSystemSizeCardComponent} from './components/practice-linear-system-size-card/practice-linear-system-size-card.component'
import {PracticeSolutionCardComponent} from './components/practice-solution-card/practice-solution-card.component'
import {PracticeStandardFormCardComponent} from './components/practice-standard-form-card/practice-standard-form-card.component'
import {PracticeTableauComponent} from './components/practice-tableau/practice-tableau.component'
import {PracticeTableausCardComponent} from './components/practice-tableaus-card/practice-tableaus-card.component'
import {SolutionComponent} from './components/solution/solution.component'
import {StandardFormComponent} from './components/standard-form/standard-form.component'
import {TableauComponent} from './components/tableau/tableau.component'
import {VarDirective} from '../ng-var.directive';
import { LearnTableausGeneralCardComponent } from './components/learn-tableaus-general-card/learn-tableaus-general-card.component';
import { LearnTableausFirstCardComponent } from './components/learn-tableaus-first-card/learn-tableaus-first-card.component';
import { LearnTableausSecondCardComponent } from './components/learn-tableaus-second-card/learn-tableaus-second-card.component';
import { LearnSolutionCardComponent } from './components/learn-solution-card/learn-solution-card.component'


@NgModule({
  declarations: [
    AdminEditExerciseComponent,
    AdminExercisesComponent,
    AdminNewExerciseComponent,
    AppComponent,
    CalcComponent,
    CardComponent,
    ExerciseComponent,
    LearnComponent,
    LinearSystemDataCardComponent,
    LinearSystemDataComponent,
    LinearSystemSizeComponent,
    HeaderComponent,
    HomeComponent,
    PracticeComponent,
    PracticeExerciseComponent,
    PracticeLinearSystemSizeCardComponent,
    PracticeSolutionCardComponent,
    PracticeTableauComponent,
    SolutionComponent,
    StandardFormComponent,
    TableauComponent,
    VarDirective,
    PracticeLinearSystemDataCardComponent,
    PracticeStandardFormCardComponent,
    PracticeTableausCardComponent,
    LearnLinearSystemSizeCardComponent,
    LearnOverviewCardComponent,
    LearnLinearSystemDataCardComponent,
    LearnStandardFormCardComponent,
    LearnTableausThirdCardComponent,
    LearnTableausGeneralCardComponent,
    LearnTableausFirstCardComponent,
    LearnTableausSecondCardComponent,
    LearnSolutionCardComponent
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
