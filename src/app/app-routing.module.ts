import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindProgramPageComponent } from './find-program-page/find-program-page.component';
import { TransferDatabasePageComponent } from './transfer-database-page/transfer-database-page.component';
import { ProgramPlannerPageComponent } from './program-planner-page/program-planner-page.component';
import { HomepageComponent } from './homepage/homepage.component';




const routes: Routes = [
  {path: 'Homepage', component: HomepageComponent},
  {path: 'FindProgramPage', component: FindProgramPageComponent},
  {path: 'TransferDatabasePage', component: TransferDatabasePageComponent},
  {path: 'ProgramPlannerPage', component: ProgramPlannerPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

