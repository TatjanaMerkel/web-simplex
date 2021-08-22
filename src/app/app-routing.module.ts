import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AdminEditExerciseComponent} from './pages/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './pages/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './pages/admin-new-exercise/admin-new-exercise.component'
import {CalcComponent} from './pages/calc/calc.component'
import {ExerciseComponent} from './pages/exercise/exercise.component'
import {LearnComponent} from './pages/learn/learn.component'
import {HomeComponent} from './pages/home/home.component'
import {PracticeComponent} from './pages/practice/practice.component'
import {PracticeExerciseComponent} from './pages/practice-exercise/practice-exercise.component'

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'admin', redirectTo: 'admin/exercises', pathMatch: 'full'},
  {path: 'admin/exercises', component: AdminExercisesComponent},
  {path: 'admin/exercises/new', component: AdminNewExerciseComponent},
  {path: 'admin/exercises/:exercise_id', component: AdminEditExerciseComponent},
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
