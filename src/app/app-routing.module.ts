import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CalculatorComponent} from "./pages/calculator/calculator.component";
import {LearningComponent} from "./pages/learning/learning.component";
import {PractiseComponent} from "./pages/practise/practise.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'learning', component: LearningComponent},
  {path: 'practise', component: PractiseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
