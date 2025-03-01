import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainActivityComponent } from "./main-activity/component";

const routes: Routes = [
  { path: "", component: MainActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
