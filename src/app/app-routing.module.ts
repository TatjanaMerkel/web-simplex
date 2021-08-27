import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AdminEditExerciseComponent} from './components/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './components/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './components/admin-new-exercise/admin-new-exercise.component'
import {CalcComponent} from './components/calc/calc.component'
import {ExerciseComponent} from './components/exercise/exercise.component'
import {HomeComponent} from './components/home/home.component'
import {LearnComponent} from './components/learn/learn.component'
import {PracticeComponent} from './components/practice/practice.component'
import {PracticeExerciseComponent} from './components/practice-exercise/practice-exercise.component'

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'admin', redirectTo: 'admin/exercises', pathMatch: 'full'},
  {path: 'admin/exercises', component: AdminExercisesComponent},
  {path: 'admin/exercises/:exercise_id', component: AdminEditExerciseComponent},
  {path: 'admin/exercises/new', component: AdminNewExerciseComponent},
  {path: 'calc', component: CalcComponent},
  {path: 'exercises/:exerciseId', component: ExerciseComponent},
  {path: 'learn', component: LearnComponent},
  {path: 'practice', component: PracticeComponent},
  {path: 'practice/:exercise_id', component: PracticeExerciseComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
