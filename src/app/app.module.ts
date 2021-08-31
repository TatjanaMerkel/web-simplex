import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import {AdminEditExerciseComponent} from './components/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './components/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './components/admin-new-exercise/admin-new-exercise.component'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {CalcComponent} from './components/calc/calc.component'
import {CalcLinearSystemDataCardComponent} from './components/calc/calc-linear-system-data-card/calc-linear-system-data-card.component'
import {CalcLinearSystemSizeCardComponent} from './components/calc/calc-linear-system-size-card/calc-linear-system-size-card.component'
import {CalcSolutionCardComponent} from './components/calc/calc-solution-card/calc-solution-card.component'
import {CalcStandardFormCardComponent} from './components/calc/calc-standard-form-card/calc-standard-form-card.component'
import {CalcTableauCardComponent} from './components/calc/calc-tableau-card/calc-tableau-card.component'
import {CardComponent} from './components/common/card/card.component'
import {HeaderComponent} from './components/common/header/header.component'
import {HomeComponent} from './components/home/home.component'
import {LearnComponent} from './components/learn/learn.component'
import {LearnLinearSystemDataCardComponent} from './components/learn/learn-linear-system-data-card/learn-linear-system-data-card.component'
import {LearnLinearSystemSizeCardComponent} from './components/learn/learn-linear-system-size-card/learn-linear-system-size-card.component'
import {LearnOverviewCardComponent} from './components/learn/learn-overview-card/learn-overview-card.component'
import {LearnSolutionCardComponent} from './components/learn/learn-solution-card/learn-solution-card.component'
import {LearnStandardFormCardComponent} from './components/learn/learn-standard-form-card/learn-standard-form-card.component'
import {LearnTableausFirstCardComponent} from './components/learn/learn-tableaus-first-card/learn-tableaus-first-card.component';
import {LearnTableausGeneralCardComponent} from './components/learn/learn-tableaus-general-card/learn-tableaus-general-card.component';
import {LearnTableausSecondCardComponent} from './components/learn/learn-tableaus-second-card/learn-tableaus-second-card.component';
import {LearnTableausThirdCardComponent} from './components/learn/learn-tableaus-third-card/learn-tableaus-third-card.component'
import {LinearSystemDataComponent} from './components/common/linear-system-data/linear-system-data.component'
import {PracticeComponent} from './components/practice/practice.component'
import {PracticeExerciseComponent} from './components/practice-exercise/practice-exercise.component'
import {PracticeLinearSystemDataCardComponent} from './components/practice-exercise/practice-linear-system-data-card/practice-linear-system-data-card.component'
import {PracticeLinearSystemSizeCardComponent} from './components/practice-exercise/practice-linear-system-size-card/practice-linear-system-size-card.component'
import {PracticeSolutionCardComponent} from './components/practice-exercise/practice-solution-card/practice-solution-card.component'
import {PracticeStandardFormCardComponent} from './components/practice-exercise/practice-standard-form-card/practice-standard-form-card.component'
import {PracticeTableausCardComponent} from './components/practice-exercise/practice-tableaus-card/practice-tableaus-card.component'
import {VarDirective} from '../ng-var.directive';
import { PracticeInitLinearSystemDataCardComponent } from './components/practice-exercise/practice-init-linear-system-data-card/practice-init-linear-system-data-card.component'

@NgModule({
  declarations: [
    AdminEditExerciseComponent,
    AdminExercisesComponent,
    AdminNewExerciseComponent,
    AppComponent,
    CalcComponent,
    CalcLinearSystemDataCardComponent,
    CalcLinearSystemSizeCardComponent,
    CalcSolutionCardComponent,
    CalcStandardFormCardComponent,
    CalcTableauCardComponent,
    CardComponent,
    HeaderComponent,
    HomeComponent,
    LearnComponent,
    LearnLinearSystemDataCardComponent,
    LearnLinearSystemSizeCardComponent,
    LearnOverviewCardComponent,
    LearnSolutionCardComponent,
    LearnStandardFormCardComponent,
    LearnTableausFirstCardComponent,
    LearnTableausGeneralCardComponent,
    LearnTableausSecondCardComponent,
    LearnTableausThirdCardComponent,
    LinearSystemDataComponent,
    PracticeComponent,
    PracticeExerciseComponent,
    PracticeLinearSystemDataCardComponent,
    PracticeLinearSystemSizeCardComponent,
    PracticeSolutionCardComponent,
    PracticeStandardFormCardComponent,
    PracticeTableausCardComponent,
    VarDirective,
    PracticeInitLinearSystemDataCardComponent
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
