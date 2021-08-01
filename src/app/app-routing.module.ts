import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AdminComponent} from './pages/admin/admin.component'
import {AdminExercisesComponent} from './pages/admin-exercises/admin-exercises.component';
import {CalculatorComponent} from './pages/calculator/calculator.component'
import {ExerciseComponent} from './pages/exercise/exercise.component';
import {HomeComponent} from './home/home.component'
import {LearningComponent} from './pages/learning/learning.component'
import {PractiseComponent} from './pages/practise/practise.component'

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/exercises', component: AdminExercisesComponent},
  {path: 'admin/exercises/new', component: AdminExercisesComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'exercises/:exerciseId', component: ExerciseComponent},
  {path: 'learning', component: LearningComponent},
  {path: 'practise', component: PractiseComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
