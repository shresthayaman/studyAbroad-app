import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindProgramPageComponent } from './find-program-page/find-program-page.component';
import { TransferDatabasePageComponent } from './transfer-database-page/transfer-database-page.component';
import { ProgramPlannerPageComponent } from './program-planner-page/program-planner-page.component';




const routes: Routes = [
  {path: '', component: FindProgramPageComponent},
  {path: 'TransferDatabasePage', component: TransferDatabasePageComponent},
  {path: 'ProgramPlannerPage', component: ProgramPlannerPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

