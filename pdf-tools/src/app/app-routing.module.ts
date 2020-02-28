import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MergeUtilityComponent } from './merge-utility/merge-utility.component';
import { SplitUtilityComponent } from './split-utility/split-utility.component';


const routes: Routes = [
  { path: "merge", component: MergeUtilityComponent },
  { path: "split", component: SplitUtilityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
