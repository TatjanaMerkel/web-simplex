import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AdminEditExerciseComponent} from './pages/admin-edit-exercise/admin-edit-exercise.component'
import {AdminExercisesComponent} from './pages/admin-exercises/admin-exercises.component'
import {AdminNewExerciseComponent} from './pages/admin-new-exercise/admin-new-exercise.component'
import {CalculatorComponent} from './pages/calculator/calculator.component'
import {ExerciseComponent} from './pages/exercise/exercise.component'
import {LearningComponent} from './pages/learning/learning.component'
import {HomeComponent} from './pages/home/home.component'
import {PracticeComponent} from './pages/practice/practice.component'

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'admin', redirectTo: 'admin/exercises', pathMatch: 'full'},
  {path: 'admin/exercises', component: AdminExercisesComponent},
  {path: 'admin/exercises/new', component: AdminNewExerciseComponent},
  {path: 'admin/exercises/:exercise_id', component: AdminEditExerciseComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'exercises/:exerciseId', component: ExerciseComponent},
  {path: 'learning', component: LearningComponent},
  {path: 'practice', component: PracticeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
